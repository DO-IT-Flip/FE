import axios from "./axios"; 

/**
 * 랜덤 명언 조회 요청
 */
export const getRandomQuote = async () => {
  const response = await axios.get("/api/quotes/random");
  return response.data;
};