import axiosInstance from "./axios";

export interface News {
  id?: number;
  title: string;
  description: string;
  date: string; // format: YYYY-MM-DD
  imagePath?: string;
}

export const getNews = async (): Promise<News[]> => {
  const response = await axiosInstance.get<News[]>("/api/news");
  return response.data;
};

export const getNewsById = async (id: number): Promise<News> => {
  const response = await axiosInstance.get<News>(`/api/news/${id}`);
  return response.data;
};

export const createNews = async (news: News): Promise<News> => {
  const response = await axiosInstance.post<News>("/api/news", news);
  return response.data;
};

export const updateNews = async (id: number, news: News): Promise<News> => {
  const response = await axiosInstance.put<News>(`/api/news/${id}`, news);
  return response.data;
};

export const deleteNews = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/api/news/${id}`);
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axiosInstance.post<{ url: string }>("/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.url;
};
