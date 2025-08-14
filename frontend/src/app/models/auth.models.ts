export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
}
