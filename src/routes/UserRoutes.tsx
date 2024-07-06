import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import GuardedRoute from "./GuardedRoutes";
import Home from "@/views/Home";
import Login from "@/views/Auth/Login";
import SignUp from "@/views/Auth/SignUp";

function UserRoutes() {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/signup" element={<GuardedRoute Component={SignUp} isPublic/>} />
        <Route path="/home" element={<GuardedRoute Component={Home} isPublic />} />
        <Route path="/login" element={<GuardedRoute Component={Login} />} />
      </Route>,
    ),
  );
}

export default UserRoutes;
