import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="bg-black text-red p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold mr-2">STRIVE</div>
          </div>

          <nav>
            <ul className="flex space-x-4">
              {["Home", "Features", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-gray-300 text-red-600">
                    {item}
                  </a>
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