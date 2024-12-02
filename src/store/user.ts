import { hookstate } from "@hookstate/core";

export const initialStore = {
  token: window.localStorage.getItem("token") || "",
  user: {} ,
  tokenType: "",
};

const state = hookstate(initialStore);

const User = {
  state,
};

export default User;
