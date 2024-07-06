import auth from "@/services/auth";
import User from "./user";
import { hookstate } from "@hookstate/core";
import { UserDTO } from "@/interfaces/auth/auth";

export const initialStore = {
  token: window.localStorage.getItem("token") || "",
};

const store = hookstate(initialStore);

async function login(userDTO: UserDTO) {
  // we should not wrap this in try catch, insted let the error bubble up
  const { data } = await auth.login(userDTO);
  localStorage.setItem("token", data.token);
  User.state.token.set(data.token);
  User.state.user.set(data.user);
}

async function signUp(userDTO: UserDTO) {
  // we should not wrap this in try catch, insted let the error bubble up
  const {
    data: { session, user },
  } = await auth.signUp(userDTO);
  User.state.token.set(session);
  User.state.user.set(user);
  localStorage.setItem("token", session);
}

async function validateCode(code: string) {
  return auth.validateCode(code);
}

async function decodeJWT() {
  const { data } = await auth.decodeJWT();
  User.state.user.set(data.user);
}

const Auth = {
  store,
  login,
  signUp,
  validateCode,
  decodeJWT,
}

export default Auth;