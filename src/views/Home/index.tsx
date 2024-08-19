import { useNavigate } from "react-router-dom";
import striveLogo from "../../assets/STRIVELOGO.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="font-sans">
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
                  navigate("/signup");
                }}
                className="bg-white text-red-600 px-10 py-3 rounded-full font-bold hover:bg-red-100 transition duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-100">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏆",
                title: "Track your goals",
                description: "Keep track of your achievements and stay motivated.",
              },
              {
                icon: "⏰",
                title: "Optimize your time",
                description: "Manage your time efficiently and boost productivity.",
              },
              { icon: "💪", title: "Stay healthy", description: "Maintain a healthy lifestyle while working hard." },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <i className="text-4xl mb-4 block">{feature.icon}</i>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Send Your Feedback</h2>
          <form className="max-w-lg mx-auto">
            <input type="text" placeholder="Name" required className="w-full mb-4 p-2 border rounded" />
            <input type="email" placeholder="Email" required className="w-full mb-4 p-2 border rounded" />
            <textarea placeholder="Message" required className="w-full mb-4 p-2 border rounded h-32"></textarea>
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 w-full"
            >
              Send Message
            </button>
          </form>
          <div className="flex justify-center space-x-4 mt-8">
            {["Facebook", "Twitter", "LinkedIn"].map((platform) => (
              <a key={platform} href="#" className="text-red-600 hover:text-red-800">
                {platform}
              </a>
            ))}
          </div>
        </section>

        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto">
            <p className="text-center">© 2024 STRIVE. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
