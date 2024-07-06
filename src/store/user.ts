import { hookstate } from "@hookstate/core";
import { User as UserType } from "@/interfaces/user/user";

export const initialStore = {
  token: window.localStorage.getItem("token") || "",
  user: {} as UserType,
};

const state = hookstate(initialStore);

const User = {
  state,
}

export default User;