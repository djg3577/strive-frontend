import auth from "@/services/auth";
import User from "./user";
import { hookstate } from "@hookstate/core";
import { UserDTO } from "@/interfaces/auth/auth";
import { clearToken, getToken, getTokenType, setToken } from "./authUtils";

export const initialStore = {
  token: getToken() || "",
  tokenType: getTokenType() || "",
};

const store = hookstate(initialStore);

async function login(userDTO: UserDTO) {
  const { data } = await auth.login(userDTO);
  setToken(data.token, "jwt");
  User.state.token.set(data.token);
  User.state.tokenType.set("jwt");
  User.state.user.set(data.user);
}

async function signUp(userDTO: UserDTO) {
  const {
    data: { session, user },
  } = await auth.signUp(userDTO);
  setToken(session, "jwt");
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
  console.log("CODE", code);
  const { data } = await auth.loginWithGitHub(code);
  // Note we receive a token and a user object

  setToken(data.token, "github");
  User.state.user.set(data.user);
}

function logout() {
  clearToken();
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
  store,
  login,
  signUp,
  validateCode,
  decodeJWT,
  logout,
  loginWithGitHub,
};

export default Auth;
