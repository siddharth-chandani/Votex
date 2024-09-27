const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateToken, jwtAuthMiddleWare } = require("../auth/jwt");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body; //assuming the request body contains the person data
    //find admin in our dbs
    
    const adminD = User.findOne({ role: "admin" });
    if (data.role === "admin" && adminD) {
      return res.status(400).json({ error: "admin already exists" });
    }

    // Check if a user with the same Aadhar Card Number already exists
    const existingUser = await User.findOne({
      aadhaarCardNumber: data.aadhaarCardNumber,
    });
    if (existingUser) {
      return res.status(400).json({
        error: "User with the same Aadhaar Card Number already exists",
      });
    }

    //create a new user document using the moongoose model
    const newUser = new User(data);
    //save the new user to the database
    const response = await newUser.save();
    console.log("data saved");
    //create payload for token
    const payload = {
      id: response.id,
    };

    const token = generateToken(payload);
    console.log("token is ", token);

    return res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    //extract aadhaar and password form request body
    const { aadhaarCardNumber, password } = req.body;
    // find the user by aadhaarCardNumber
    const user = await User.findOne({ aadhaarCardNumber: aadhaarCardNumber });
    console.log(user)
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "invalid username or password " });
    }

    // generate Token 
    const payload = {
      id: user.id,
  }
  const token = generateToken(payload);
    //return token as responce
    return res.json({data: user,token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
  }
});
router.get("/profile", jwtAuthMiddleWare, async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await User.findById(userId);
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
  }
});
router.put("/profile/password", jwtAuthMiddleWare, async (req, res) => {
  try {
    const userId = req.user.id; //extract id from the token
    const { currentPassword, newPassword } = req.body;
    //find the user by userId
    const user = await User.findById(userId);

    //if password did not match
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "invalid username or password " });
    }

    //update users password
    user.password = newPassword;
    await user.save();

    console.log("data updated");
    return res.status(200).json({ message: "password updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
