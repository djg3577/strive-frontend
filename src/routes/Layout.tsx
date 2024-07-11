import { Outlet } from "react-router-dom";
import img from '../assets/STRIVELOGO.png';


const Layout = () => {
  return (
    <>
      <img
        src={img}
        alt="logo"
        className="logo"
      />
      <Outlet />
    </>
  );
}

export default Layout;