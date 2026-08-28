import axiosInstance from "./axios";

export interface Achievement {
  id?: number;
  title: string;
  description: string;
  imagePath?: string;
  tier?: string;
  rank: number;
  date: string; // format: YYYY-MM-DD
  organizer: string;
}

export const getAchievements = async (): Promise<Achievement[]> => {
  const response = await axiosInstance.get<Achievement[]>("/api/achievements");
  return response.data;
};

export const getAchievementById = async (id: number): Promise<Achievement> => {
  const response = await axiosInstance.get<Achievement>(`/api/achievements/${id}`);
  return response.data;
};

export const createAchievement = async (achievement: Achievement): Promise<Achievement> => {
  const response = await axiosInstance.post<Achievement>("/api/achievements", achievement);
  return response.data;
};

export const updateAchievement = async (id: number, achievement: Achievement): Promise<Achievement> => {
  const response = await axiosInstance.put<Achievement>(`/api/achievements/${id}`, achievement);
  return response.data;
};

export const deleteAchievement = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/api/achievements/${id}`);
};
