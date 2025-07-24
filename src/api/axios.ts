import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://34.9.66.139:8080",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    // 회원가입, 로그인 요청은 Authorization 헤더를 제거
    const excludedUrls = ["/api/auth/signup", "/api/auth/login"];
    const isExcluded = excludedUrls.some((url) => config.url?.includes(url));

    if (!isExcluded && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
