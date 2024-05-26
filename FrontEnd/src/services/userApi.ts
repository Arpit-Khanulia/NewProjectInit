import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UserT {
  username: string;
  email: string;
  password: string;
}

interface UserData {
  data: object;
  message: string;
  success: boolean;
}

interface UserLoginT {
  username: string;
  email: string;
  id: string;
  profilePicture: string;
}

type UserLoginType = {
  data: UserLoginT;
  message: string;
  success: boolean;
};

type Dashboard = {
  data: object;
  message: string;
  success: boolean;
};

export const getUsers = createApi({
  reducerPath: "getUsers",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    credentials: "include",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({

    dashboard: builder.query<Dashboard, void>({
      query: () => ({ url: "/dashboard", method: "GET" }),
      providesTags: ["auth"],
    }),

    register: builder.mutation<UserData, UserT>({
      query: (body: UserT) => ({ url: "/register", method: "POST", body }),
      invalidatesTags:['auth']
    }),

    login: builder.mutation<UserLoginType, UserT>({
      query: (body: UserT) => ({ url: "/login", method: "POST", body }),
      invalidatesTags:['auth']
    }),

    
  }),
});

export const { useLazyDashboardQuery, useRegisterMutation, useLoginMutation } = getUsers;
