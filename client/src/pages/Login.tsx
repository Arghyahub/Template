import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.VITE_SERVER;

interface formItem {
  target: {
    name: HTMLInputElement;
    email: HTMLInputElement;
    passwd: HTMLInputElement;
  };
}

const Auth = () => {
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> & formItem
  ) => {
    e.preventDefault();
    const email = e.target.email.value;
    const passwd = e.target.passwd.value;

    const payload = { email, passwd };

    const resp = await fetch(`${SERVER}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    console.log(data);
    localStorage.setItem("token", data.token);

    // server call
    navigate("/dashboard");
  };
  return (
    <div className="flex flex-row justify-center items-center p-5 w-screen h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
        <button className="bg-blue-500 p-2">Login</button>
      </form>
    </div>
  );
};

export default Auth;
