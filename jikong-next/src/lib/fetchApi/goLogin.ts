import Cookies from "js-cookie";
import { API_BASE_URL } from "../constants";

export default () => {
  if (typeof window !== "undefined") {
    Cookies.remove("jwt");
    location.href = `${API_BASE_URL}/login`;
  }
};
