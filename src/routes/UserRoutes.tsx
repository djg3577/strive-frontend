import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import GuardedRoute from "./GuardedRoutes";
import Home from "@/views/Home";
import Login from "@/views/Auth/Login";
import SignUp from "@/views/Auth/SignUp";
import Activities from "@/views/Activities/Activity";
import Layout from "./Layout";

function UserRoutes() {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/signUp" element={<GuardedRoute Component={SignUp} isPublic />} />
        <Route path="/home" element={<GuardedRoute Component={Home} isPublic />} />
        <Route path="/login" element={<GuardedRoute Component={Login} isPublic />} />
        <Route path="/activities" element={<GuardedRoute Component={Activities} isPublic />} />
        <Route path="*" element={<GuardedRoute Component={Home} isPublic />} />
      </Route>,
    ),
  );
}

export default UserRoutes;
