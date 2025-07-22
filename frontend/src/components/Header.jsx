import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <header className="bg-slate-200 text-slate-700 p-4 flex justify-between items-center flex-wrap shadow-lg">
        <Link to="/" className="text-2xl font-bold">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Iftiinshe</span>
            <span className="text-slate-700">Auto</span>
          </h1>
        </Link>
        <div className="flex items-center space-x-4 bg-slate-100 p-1 rounded w-1/3 ">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded border-none w-full focus:outline-none bg-transparent"
          />
          <FaSearch className="w-5 h-5 text-gray-600" />
        </div>
        <nav>
          <ul className="flex space-x-4 flex-wrap text">
            <li className="hidden sm:inline">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
