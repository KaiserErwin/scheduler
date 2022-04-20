export interface UserRegisterRequest {
  adminId: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserUpdateRequest {
  firstName: string;
  lastName: string;
}
