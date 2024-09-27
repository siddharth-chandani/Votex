import React, { useContext, useState } from "react";
import Logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import { useNavigate  } from 'react-router-dom';

const Navbar = () => {
  const {token,userInfo,signOut}=useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();


  const signOuthandler =()=>{
    signOut()
    navigate("/")
    window.location.reload()
  }
  

  return (
    <nav className="bg-white mb-2  w-full  top-0 start-0 border-b border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-12 scale-75" alt="Flowbite Logo" />
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
       {token ? 
       
<div>
  <button onClick={() => setIsMenuOpen((prev) => !prev)}  id="dropdownAvatarNameButton"  data-dropdown-toggle="dropdownAvatarName" className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-8 focus:ring-1 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-slate-900" type="button">
    <span className="sr-only">Open user menu</span>
    <img className="w-8 h-8 me-2 rounded-full" src="https://xsgames.co/randomusers/avatar.php?g=male" />
    {userInfo.name}
    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
    </svg>
  </button>
  {/* Dropdown menu */}
  <div id="dropdownAvatarName" className={`${
                        isMenuOpen ? "" : "hidden"
                    } dark:-bg--clr-neutral-900 z-10 absolute  mt-4  bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600`}>
    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
      <div className="font-medium ">User</div>
     
    </div>
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
    <li>
        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
    </li>   
    <li>
        <button onClick={signOuthandler} className="w-full pr-20 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign Out</button>
    </li>   
    </ul>

  </div>
</div>


       
       
       
       : <Link to="/login">
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-[#00263a] dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Sign In
            </button>
          </Link>}   
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white  ">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-slate-800  rounded "
                aria-current="page"
              >
                Home
              </Link>
            </li>
            
    {token?<>{userInfo.role==="admin"?
    <li> <Link
    to="/candidate"
    className="block py-2 px-3 text-slate-800  rounded "
    aria-current="page"
  >
    Add Candidate
  </Link></li>
    :<></>}
             
            </>:<></>}
            
            <li>
              <Link
                to="/liveelection"
                className="block py-2 px-3 text-slate-800  rounded "
                aria-current="page"
              >
                Live Elections
              </Link>
            </li>

            <li>
              <Link
                to="/liveresults"
                className="block py-2 px-3 text-slate-800  rounded "
              >
                Results
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-slate-800  rounded "
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-slate-800  rounded "
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
