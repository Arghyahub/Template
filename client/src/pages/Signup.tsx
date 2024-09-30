import React from "react";

const SERVER = import.meta.env.VITE_SERVER;

interface formItem {
  target: {
    name: HTMLInputElement;
    email: HTMLInputElement;
    passwd: HTMLInputElement;
  };
}

const Auth = () => {
  console.log(SERVER);
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> & formItem
  ) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const passwd = e.target.passwd.value;

    const payload = { name, email, passwd };

    const resp = await fetch(`${SERVER}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    console.log(data);
    // server call
  };
  return (
    <div className="flex flex-row justify-center items-center p-5 w-screen h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="p-1 border"
        />
        <input
          name="email"
          type="text"
          placeholder="email"
          className="p-1 border"
        />
        <input
          name="passwd"
          type="text"
          placeholder="password"
          className="p-1 border"
        />
        <button className="bg-blue-500 p-2">Signup</button>
      </form>
    </div>
  );
};

export default Auth;
