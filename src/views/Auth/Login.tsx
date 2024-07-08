import Auth from "@/store/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
interface LoginData {
  email: string;
  password: string;
  username: string;
}

function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
    username: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    Auth.login(loginData);
    navigate("/home");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>Enter email</p>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleInputChange}
          required
        />
        <p>Enter password</p>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
          required
        />
        <p>Enter username</p>
        <input
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleInputChange}
          required
        />
        <div></div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
