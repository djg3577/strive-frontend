import auth from "@/services/auth";
import User from "./user";
import { hookstate } from "@hookstate/core";
import { UserDTO } from "@/interfaces/auth/auth";
import { clearToken, getToken, getTokenType, setToken } from "./authUtils";

export const initialStore = {
  token: getToken() || "",
  tokenType: getTokenType() || "",
};

const state = hookstate(initialStore);

async function login(userDTO: UserDTO) {
  const { data } = await auth.login(userDTO);
  setToken(data.token, "jwt");
  state.token.set(data.token);
  state.tokenType.set("jwt");
  User.state.token.set(data.token);
  User.state.tokenType.set("jwt");
  User.state.user.set(data.user);
}

async function signUp(userDTO: UserDTO) {
  const {
    data: { session, user },
  } = await auth.signUp(userDTO);
  setToken(session, "jwt");
  state.token.set(session);
  state.tokenType.set("jwt");
  User.state.token.set(session);
  User.state.tokenType.set("jwt");
  User.state.user.set(user);
}

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
  login,
  signUp,
  validateCode,
  decodeJWT,
  logout,
  loginWithGitHub,
};

export default Auth;
