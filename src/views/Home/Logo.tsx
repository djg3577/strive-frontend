import User from "@/store/user";
import { useNavigate } from "react-router-dom";
import striveLogo from "../../assets/STRIVELOGO.png";

export const Logo = () => {
  const navigate = useNavigate();
  const isLoggedIn = User.state.user.username.get();
  return (
    <section id="hero" className="bg-gray-100 text-red-600 text-center py-32 relative overflow-show">
      <div
        className="absolute inset-0 opacity-10 bg-no-repeat bg-center "
        style={{
          backgroundImage: `url(${striveLogo})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      />
      <div className="relative container mx-auto px-4 flex flex-col justify-between h-full">
        <div className="mb-32">
          <h1 className="text-5xl font-bold">Achieve More with STRIVE</h1>
        </div>
        <div className="mt-24 -mb-15">
          <p className="text-2xl font-semibold">Crush your goals easily</p>
          <button
            onClick={() => {
              isLoggedIn ? navigate("/activities") : navigate("/signup");
            }}
            className="bg-white text-red-600 px-10 py-3 rounded-full font-bold hover:bg-red-100 transition duration-300"
          >
            {isLoggedIn ? "Go To My Activities" : "Get Started"}
          </button>
        </div>
      </div>
    </section>
  );
};
