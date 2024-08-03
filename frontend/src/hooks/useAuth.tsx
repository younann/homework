import Cookies from "js-cookie";
import { userStore } from "../stores/userStore";
import { loginWithGoogle } from "../services/apiService";
import { message } from "antd";

const useAuth = () => {
  const login = () => {
    loginWithGoogle();
  };

  const logout = () => {
    try {
      userStore.setUser(null);
      Cookies.remove("user");
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to log out:", error);
      message.error("Logout failed. Please try again.");
    }
  };

  return { login, logout };
};
export default useAuth;
