import axiosInstance from "./axios";
import { type Major } from "./jurusanApi";

export interface StudentInfo {
  id?: number;
  nisn?: string;
  name: string;
  email?: string;
  address?: string;
  major?: Major;
  imagePath?: string;
}

export interface Alumni {
  studentId: number;
  student?: StudentInfo;
  instance?: string;
  graduationYear?: string;
  quote?: string;
}

export interface AlumniRequest {
  studentId?: number;
  name: string;
  email?: string;
  majorId?: number;
  nisn?: string;
  address?: string;
  instance?: string;
  graduationYear?: number;
  quote?: string;
}

export const getAlumni = async (search?: string): Promise<Alumni[]> => {
  const params = search ? { search } : {};
  const response = await axiosInstance.get<Alumni[]>("/api/alumni", { params });
  return response.data;
};

export const getAlumniById = async (studentId: number): Promise<Alumni> => {
  const response = await axiosInstance.get<Alumni>(`/api/alumni/${studentId}`);
  return response.data;
};

export const createAlumni = async (data: AlumniRequest): Promise<Alumni> => {
  const response = await axiosInstance.post<Alumni>("/api/alumni", data);
  return response.data;
};

export const updateAlumni = async (studentId: number, data: AlumniRequest): Promise<Alumni> => {
  const response = await axiosInstance.put<Alumni>(`/api/alumni/${studentId}`, data);
  return response.data;
};

export const deleteAlumni = async (studentId: number): Promise<void> => {
  await axiosInstance.delete(`/api/alumni/${studentId}`);
};
