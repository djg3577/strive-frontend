import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const handleLogout = async () => {
  try {
    // perform logout
    localStorage.removeItem("token");

    //redirect to login
    window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
};

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || localStorage.getItem("githubToken");
    const tokenType = localStorage.getItem("tokenType");
    if (token) {
      if (tokenType === "github") {
        config.headers.Authorization = `GitHub ${token}`;
      } else 
      config.headers.Authorization = `Bearer ${token}`;
    }
    return { ...config };
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Axios Response interceptor
instance.interceptors.response.use(
  (response) => {
    // Log the response headers
    if (response.headers["x-token-expired"] === "true") {
      handleLogout();
    }
    return response;
  },
  (error) => {
    if (error?.response?.headers["x-token-expired"] === "true") {
      handleLogout();
    }

    return Promise.reject(error);
  },
);

export default instance;
