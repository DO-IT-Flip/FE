import axiosInstance from "@src/api/axios";

interface SignupPayload {
  name: string;
  username: string;
  password: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

// 회원가입 요청
export const signup = (data: SignupPayload) => {
  return axiosInstance.post("/api/auth/signup", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: undefined, // Authorization 헤더 강제 제거
    },
  });
};

// 로그인 요청
export const login = (formData: FormData) => {
  return axiosInstance.post("/api/auth/login", formData, {
    headers: {
      Authorization: undefined,
      "Content-Type": "multipart/form-data",
    },
  });
};

// 로그아웃 API
export const logout = async () => {
  try {
    const response = await axiosInstance.post("/api/auth/logout", null, {
      withCredentials: true, // 쿠키에 저장된 리프레시 토큰 포함되도록
    });

    // 로그아웃 성공 후 localStorage 비우기
    localStorage.removeItem("access");
    delete axiosInstance.defaults.headers.common["Authorization"];

    return response;
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};

// Access token 재발급 API
export const reissue = async () => {
  try {
    const response = await axiosInstance.post("/api/auth/reissue", null, {
      withCredentials: true, // 쿠키에 저장된 리프레시 토큰 포함되도록
    });
    const newAccessToken = response.data.accessToken;
    if (newAccessToken) {
      localStorage.setItem("access", newAccessToken);
      return newAccessToken;
    }
  } catch (error) {
    console.error("token 재발급 실패:", error);
    throw error;
  }
};
