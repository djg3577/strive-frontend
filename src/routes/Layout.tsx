import Auth from "@/store/auth";
import { useHookstate } from "@hookstate/core";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const AuthState = useHookstate(Auth.state);
  const loggedIn = !!AuthState.token.get().length;

  const authItem = loggedIn
    ? {
        label: "Logout",
        command: () => {
          Auth.logout();
          navigate("/home");
        },
      }
    : {
        label: "Signup",
        command: () => navigate("/signup"),
      };

  const navItems = [authItem];

  return (
    <>
      <header className="bg-black text-red p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div onClick={() => navigate("/activities")} className="text-2xl font-bold mr-2">
              STRIVE
            </div>
          </div>

          <nav>
            <ul className="flex space-x-4">
              {navItems.map((item) => (
                <li key={item.label} onClick={item.command} className="hover:text-gray-300 font-bold text-red-600 cursor-pointer">
                  {item.label}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
