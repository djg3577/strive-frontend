import auth from "@/services/auth";
import User from "./user";
import { hookstate } from "@hookstate/core";
import { clearToken, getToken, getTokenType, setToken } from "./authUtils";

export const initialStore = {
  token: getToken() || "",
  tokenType: getTokenType() || "",
};

const state = hookstate(initialStore);

async function validateCode(code: string) {
  return auth.validateCode(code);
}

async function decodeJWT() {
  const { data } = await auth.decodeJWT();
  User.state.user.set(data);
}

async function loginWithGitHub(code: string) {
  const { data } = await auth.loginWithGitHub(code);
  setToken(data.token, "github");
  state.token.set(data.token);
  state.tokenType.set("github");
  User.state.token.set(data.token);
  User.state.tokenType.set("github");
  User.state.user.set(data.user);
}

function logout() {
  clearToken();
  state.token.set("");
  User.state.token.set("");
  User.state.tokenType.set("");
  User.state.user.set({
    code: 0,
    id: 0,
    email: "",
    username: "",
  });
}

const Auth = {
  state,
  validateCode,
  decodeJWT,
  logout,
  loginWithGitHub,
};

export default Auth;
