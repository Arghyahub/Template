import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userStore from "../states/store";
const SERVER = import.meta.env.VITE_SERVER;

const Protected = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { name, setState } = userStore();
  const handleLoad = async () => {
    const token = localStorage.getItem("token");

    const resp = await fetch(`${SERVER}/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const res = await resp.json();
    if (!res.user) navigate("/login");

    setState(res.user.name, res.user.email, res.user._id);
  };

  useEffect(() => {
    if (!name) handleLoad();
  }, []);

  return <>{children}</>;
};

export default Protected;
