export interface userInterface {
  _id?: string;
  id?: string;
  name?: string;
  email: string;
  role?: string;
}

export interface authState {
  isAuthenticated: boolean;
  user: userInterface | null;
  isLoading: boolean;
}

export interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
