
export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserPayload {
  id: string;
  email: string;
  username?: string;
  exp?: number; 
  iat?: number; 
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username?: string;
  };
}

export interface UserContextType {
  user: UserPayload | null;
  setUser: (user: UserPayload | null) => void;
}
