import Auth from "@/store/auth";
import { useEffect } from "react";

export function HandleGitHubLogin() {
  useEffect(() => {
    const fetchGitHubToken = async (code: string) => {
      try {
        await Auth.loginWithGitHub(code);
      } catch (error) {
        console.error(error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      fetchGitHubToken(code);
    }
  }, []);

  return <></>;
}
