import apiClient from "../utils/api-client";
import {jwtDecode} from "jwt-decode";
import type { SignInForm, SignUpForm, UserPayload, AuthResponse } from "../types/user";

const tokenName = "token";

// Re-export for backward compatibility
export type { UserPayload, AuthResponse };

export async function signup(user: SignUpForm): Promise<AuthResponse> {
  const body = {
    username: user.username,
    email: user.email,
    password: user.password,
  };

  const { data } = await apiClient.post<AuthResponse>("/user/signup", body);
  
  if (data.token) {
    localStorage.setItem(tokenName, data.token);
  }
  
  return data;
}

export async function signin(user: SignInForm): Promise<AuthResponse> {
  const body = {
    email: user.email,
    password: user.password,
  };

  const { data } = await apiClient.post<AuthResponse>("/user/signin", body);
  
  if (data.token) {
    localStorage.setItem(tokenName, data.token);
  }
  
  return data;
}


export function getUser(): UserPayload | null {
  try {
    const jwt = localStorage.getItem(tokenName);
    if (!jwt) return null;
    return jwtDecode<UserPayload>(jwt);
  } catch (error) {
    return null;
  }
}

export function signOut() {
  localStorage.removeItem(tokenName);
}

export function isAuthenticated(): boolean {
  const user = getUser();
  if (!user) return false;
  
  if (user.exp && user.exp < Date.now() / 1000) {
    signOut();
    return false;
  }
  
  return true;
}
