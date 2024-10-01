import React from "react";
import Protected from "../component/Protected";
import { Link } from "react-router-dom";
import userStore from "../states/store";

const Dashboard = () => {
  const { name } = userStore();
  return (
    <Protected>
      <div className="flex flex-col gap-4 p-5">
        <h1>Profile</h1>
        <p>Hello {name?.length >= 0 && name}</p>
        <Link to="/profile" className="text-blue-400">
          Profile
        </Link>
      </div>
    </Protected>
  );
};

export default Dashboard;
