import axiosInstance from "./axios";
import { type Major } from "./jurusanApi";

export interface Student {
  id?: number;
  nisn: string;
  name: string;
  email?: string;
  address: string;
  major?: Major;
  imagePath?: string;
}

export const getStudents = async (): Promise<Student[]> => {
  const response = await axiosInstance.get<Student[]>("/api/students");
  return response.data;
};

export const getStudentById = async (id: number): Promise<Student> => {
  const response = await axiosInstance.get<Student>(`/api/students/${id}`);
  return response.data;
};

export const createStudent = async (student: Student, majorId?: number): Promise<Student> => {
  const targetMajorId = majorId ?? student.major?.id;
  const url = targetMajorId ? `/api/students/major/${targetMajorId}` : "/api/students";
  const response = await axiosInstance.post<Student>(url, student);
  return response.data;
};

export const updateStudent = async (id: number, student: Student): Promise<Student> => {
  const response = await axiosInstance.put<Student>(`/api/students/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/api/students/${id}`);
};
