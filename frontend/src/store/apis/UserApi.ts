import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SignInForm, SignUpForm, AuthResponse } from "../../types/user";

const usersApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  }),
  endpoints: (builder) => ({
    signUpUser: builder.mutation<AuthResponse, SignUpForm>({
      query: (user) => ({
        url: '/user/signup',
        method: 'POST',
        body: {
          username: user.username,
          email: user.email,
          password: user.password,
        },
      }),
    }),

    signInUser: builder.mutation<AuthResponse, SignInForm>({
      query: (user) => ({
        url: '/user/signin',
        method: 'POST',
        body: {
          email: user.email,
          password: user.password,
        },
      }),
    }),
  }),
});

export const { useSignUpUserMutation, useSignInUserMutation } = usersApi;
export { usersApi };
