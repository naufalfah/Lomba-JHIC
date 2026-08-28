import axiosInstance from "./axios";

export interface Teacher {
  id?: number;
  nip: string;
  name: string;
  email?: string;
  address: string;
  subject: string;
  imagePath?: string;
}

export const getTeachers = async (): Promise<Teacher[]> => {
  const response = await axiosInstance.get<Teacher[]>("/api/teachers");
  return response.data;
};

export const getTeacherById = async (id: number): Promise<Teacher> => {
  const response = await axiosInstance.get<Teacher>(`/api/teachers/${id}`);
  return response.data;
};

export const createTeacher = async (teacher: Teacher): Promise<Teacher> => {
  const response = await axiosInstance.post<Teacher>("/api/teachers", teacher);
  return response.data;
};

export const updateTeacher = async (id: number, teacher: Teacher): Promise<Teacher> => {
  const response = await axiosInstance.put<Teacher>(`/api/teachers/${id}`, teacher);
  return response.data;
};

export const deleteTeacher = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/api/teachers/${id}`);
};
