import axios from "axios";

const BASE = import.meta.env.VITE_API_URL as string;

/**
 * POST /photos/upload
 * S3에 파일 업로드 → URL 반환
 */
export const uploadPhotoToS3 = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${BASE}/photos/upload`, formData);

  // 서버가 string URL 또는 { url } / { imageUrl } 형태로 반환
  if (typeof res.data === "string") return res.data;
  return res.data?.url ?? res.data?.imageUrl ?? "";
};

/**
 * POST /travels/{travelId}/photos
 * URL을 여행에 등록
 */
export const registerPhotoToTravel = (travelId: string, imageUrl: string) =>
  axios.post(`${BASE}/travels/${travelId}/photos`, {
    imageUrl,
    isSnapshot: false,
  });
