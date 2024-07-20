import axios from "@/services/axios";
import Auth from "@/store/auth";
import { useEffect } from "react";

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_SECRET = import.meta.env.VITE_GITHUB_SECRET;
const GITHUB_REDIRECT_URI = "http://localhost:5173/signup";

function InitialSignUp() {
  const handleGitHubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`;
  };

  useEffect(() => {
    const fetchGitHubToken = async (code: string) => {
      try {
        await Auth.loginWithGitHub(code);
      } catch (error) {
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      fetchGitHubToken(code);
    }
  }, []);

  return (
    <div>
      <button onClick={handleGitHubLogin}>Sign Up with GitHub</button>
    </div>
  );
}

export default InitialSignUp;
