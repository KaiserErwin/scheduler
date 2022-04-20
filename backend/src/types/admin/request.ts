export interface AdminRegisterRequest {
  email?: string
  password?: string;
  firstName?: string;
  lastName?: string;
}

export interface AdminUpdateRequest {
  firstName: string;
  lastName: string;
}
