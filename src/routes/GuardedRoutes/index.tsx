import User from "@/store/user";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type PrivateRouteProps = {
  Component: () => JSX.Element;
  isPublic?: boolean;
  loginRequired?: boolean;
};

const GuardedRoute = ({ Component, isPublic, loginRequired }: PrivateRouteProps) => {
  const userState = useHookstate(User.state);
  const navigate = useNavigate();
  const isLoggedIn = userState.token.get().length;

  /**
   *
   * You have three scenarios
   * 1. Routes that everyone can access (isPublic)
   * 2. Routes that only logged in users can access (loginRequired)
   * 3. Routes that only logged out users can access (You don't pass in any props)
   */

  useEffect(() => {
    if (isPublic) return;
    if (!isLoggedIn && loginRequired) {
      navigate("/signup");
    }
    if (isLoggedIn && !loginRequired) {
      navigate("/");
    }
  }, [isLoggedIn, isPublic, loginRequired]);
  return <Component />;
};

export default GuardedRoute;
