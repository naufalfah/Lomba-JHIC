import axiosInstance from "./axios";

export interface Major {
  id?: number;
  name: string;
  description?: string;
  logoPath?: string;
}

export const getMajors = async (): Promise<Major[]> => {
  const response = await axiosInstance.get<Major[]>("/api/majors");
  return response.data;
};

export const getMajorById = async (id: number): Promise<Major> => {
  const response = await axiosInstance.get<Major>(`/api/majors/${id}`);
  return response.data;
};

export const createMajor = async (major: Major): Promise<Major> => {
  const response = await axiosInstance.post<Major>("/api/majors", major);
  return response.data;
};

export const updateMajor = async (id: number, major: Major): Promise<Major> => {
  const response = await axiosInstance.put<Major>(`/api/majors/${id}`, major);
  return response.data;
};

export const deleteMajor = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/api/majors/${id}`);
};
