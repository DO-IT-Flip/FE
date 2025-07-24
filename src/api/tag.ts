import axios from "./axios";

interface CreateTagPayload {
  name: string;
  iconId: number;
  color: string;
}

interface UpdateTagPayload {
  name: string;
  color: string;
  iconId: number;
}

// 태그 생성 API
export const createTag = async (payload: CreateTagPayload) => {
  try {
    const response = await axios.post("/api/tags", payload);
    return response.data;
  } catch (error) {
    console.error("태그 생성 실패:", error);
    throw error;
  }
};

// 태그 전체 조회 API
export const getTags = async () => {
  try {
    const response = await axios.get("/api/tags");
    return response.data;
  } catch (error) {
    console.error("태그 조회 실패:", error);
    throw error;
  }
};

// 태그 수정 API
export const updateTag = async (tagId: number, payload: UpdateTagPayload) => {
  const response = await axios.put(`/api/tags/${tagId}`, payload);
  return response.data;
};

// 태그 삭제 API
export const deleteTag = async (tagId: number) => {
  try {
    const response = await axios.delete(`/api/tags/${tagId}`);
    return response.data;
  } catch (error) {
    console.error("태그 삭제 실패:", error);
    throw error;
  }
};
