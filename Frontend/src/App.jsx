import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import React from "react";
import Layout from "./Layout/Layout";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import LiveElection from "./Components/Elections/LiveElection";
import Results from "./Components/Elections/Results";
import About from "./Components/About";
import Contact from "./Components/Contact";
import { AuthProvider } from "./Auth/AuthContext";
import Profile from "./Components/Profile";
import Candidate from "./Components/Candidate";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/liveelection",
          element: <LiveElection />,
        },
        {
          path: "/liveresults",
          element: <Results />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/candidate",
      element: <Candidate />,
    },
  ]);
  return (
    <>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
