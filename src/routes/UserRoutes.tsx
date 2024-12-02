import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import GuardedRoute from "./GuardedRoutes";
import Home from "@/views/Home";
import SignUp from "@/views/Auth/SignUp";
import Activities from "@/views/Activities/index";
import Layout from "./Layout";

function UserRoutes() {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/signUp" element={<GuardedRoute Component={SignUp} isPublic />} />
        <Route path="/home" element={<GuardedRoute Component={Home} isPublic />} />
        <Route path="/activities" element={<GuardedRoute Component={Activities} loginRequired />} />
        <Route path="*" element={<GuardedRoute Component={Home} isPublic />} />
      </Route>,
    ),
  );
}

export default UserRoutes;
