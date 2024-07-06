import { useEffect } from "react";

function Login() {
  useEffect(() => {
    console.log("Login page mounted");
    return () => {
      console.log("Login page unmounted");
    };
  }, []);

  return (
    <div>
      <h1>Login Page</h1>
    </div>
  );
}

export default Login;