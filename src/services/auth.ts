import { UserDTO } from "@/interfaces/auth/auth";
import axios from "./axios";

export default {
  signUp(credentials: UserDTO) {
    return axios.post("/auth/sign-up", credentials);
  },
  validateCode(code: string) {
    return axios.post("/auth/verify-email", { code });
  },
  decodeJWT() {
    return axios.post("/auth/decode-jwt");
  },
  loginWithGitHub(code: string) {
    return axios.post("/auth/github", { code });
  },
};
