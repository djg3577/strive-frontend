// authUtils.js

export const setToken = (token: string, type = "jwt") => {
  if (type === "github") {
    localStorage.setItem("githubToken", token);
    localStorage.setItem("tokenType", "github");
  } else {
    localStorage.setItem("token", token);
    localStorage.setItem("tokenType", "jwt");
  }
};

export const getToken = () => {
  return localStorage.getItem("token") || localStorage.getItem("githubToken");
};

export const getTokenType = () => {
  return localStorage.getItem("tokenType") || "jwt";
};

export const clearToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("githubToken");
  localStorage.removeItem("tokenType");
};
