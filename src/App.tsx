import { useEffect } from "react";
import "./App.css";
import { useHookstate } from "@hookstate/core";
import Auth from "./store/auth";
import { RouterProvider } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import "./index.css";

function App() {
  const AuthState = useHookstate(Auth.state);
  useEffect(() => {
    const token = AuthState.token.get() || localStorage.getItem("githubToken");
    if (token) {
      Auth.decodeJWT();
    }
  }, [AuthState.token]);

  return (
    <>
      <RouterProvider router={UserRoutes()} />
    </>
  );
}

export default App;
