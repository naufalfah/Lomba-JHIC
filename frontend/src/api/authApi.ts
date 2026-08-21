import axiosInstance from "./axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  email: string;
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/api/auth/login", credentials);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_email");
};

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem("admin_token");
};

export const getAdminEmail = (): string => {
  return localStorage.getItem("admin_email") ?? "";
};
