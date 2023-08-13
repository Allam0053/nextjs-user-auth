export type ApiResponse<T> = {
  code: string;
  version: string;
  message: string;
  data: T;
};

export type ApiError = {
  error: string;
};

export type PaginatedApiResponse<T> = {
  code: number;
  status: string;
  data: T;
  page: number;
  per_page: number;
  total_pages: number;
};

export type SingleDataApiResponse<T> = {
  data: T;
};

export type AuthResponse = {
  token: string;
};

export type AuthRequest = {
  email: string;
  password: string;
};
