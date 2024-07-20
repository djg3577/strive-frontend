import { useEffect } from "react";
import "./App.css";
import User from "./store/user";
import { useHookstate } from "@hookstate/core";
import Auth from "./store/auth";
import { RouterProvider } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import "./index.css";

function App() {
  const userState = useHookstate(User.state);
  useEffect(() => {
    const token = userState.token.get() || localStorage.getItem("githubToken");
    if (!token) return;
    Auth.decodeJWT();
  }, [userState.token.get(), userState.user.get()]);

  return (
    <>
      <RouterProvider router={UserRoutes()} />
    </>
  );
}

export default App;
