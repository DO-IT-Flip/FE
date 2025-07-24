import axios from "@src/api/axios";

export const fetchUserInfo = async () => {
  const response = await axios.get("/api/auth/me");
  return response.data;
};