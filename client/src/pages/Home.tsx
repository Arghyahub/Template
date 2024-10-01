import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col gap-5 p-5">
      <Link to="/signup" className="text-blue-500">
        Auth
      </Link>
      <Link to="/login" className="text-blue-500">
        Login
      </Link>
      <Link to="/dashboard" className="text-blue-500">
        Dashboard
      </Link>
      <Link to="/profile" className="text-blue-500">
        Profile
      </Link>
    </div>
  );
};

export default Home;
