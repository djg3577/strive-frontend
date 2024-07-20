import User from "@/store/user";
import { useHookstate } from "@hookstate/core";
import useNavigateToPage from "@/hooks/useNavigateToPage";
import { useEffect } from "react";

type PrivateRouteProps = {
  Component: () => JSX.Element;
  isPublic?: boolean;
  loginRequired?: boolean;
};

const GuardedRoute = ({ Component, isPublic, loginRequired }: PrivateRouteProps) => {
  const userState = useHookstate(User.state);
  const navigateToPage = useNavigateToPage();
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
      navigateToPage("/login");
    }
    if (isLoggedIn && !loginRequired) {
      navigateToPage("/");
    }
  }, [isLoggedIn, isPublic, loginRequired]);
  return <Component />;
};

export default GuardedRoute;
