import { jwtDecode } from "jwt-decode";
import type { UserPayload } from "../types/user";

export const TOKEN_NAME = "token";

export function getUser(): UserPayload | null {
  try {
    const jwt = getToken();
    if (!jwt) return null;
    return jwtDecode<UserPayload>(jwt);
  } catch (error) {
    return null;
  }
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_NAME);
}


export function setToken(token: string): void {
  localStorage.setItem(TOKEN_NAME, token);
}


export function signOut(): void {
  localStorage.removeItem(TOKEN_NAME);
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
