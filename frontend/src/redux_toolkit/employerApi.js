import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import domain from "../config/domain";
import { use } from "react";

export const employerApi = createApi({
  reducerPath: "employerApi",
  baseQuery: fetchBaseQuery({ baseUrl: domain }),
  endpoints: (builder) => ({
    getCompanyInfor: builder.query({
      query: (id) => ({
        url: "/user/get-employer-information",
        params: { id },
      }),
      transformResponse: (response) => response,
    }),
    getPostByUser: builder.query({
      query: (userId) => ({
        url: "/work/get-works-by-user",
        params: { userId },
      }),
      transformResponse: (response) => {
        console.log("redux receive getPostByUser", response);
        return response;
      },
    }),
    addPost: builder.mutation({
      query: (body) => ({
        url: "/company/post-job",
        method: "POST",
        body,
      }),
    }),
    updatePost: builder.mutation({
      query: (body) => ({
        url: "/work/edit-job",
        method: "PUT",
        body,
      }),
    }),
    deletePost: builder.mutation({
      query: ({ id, postID }) => ({
        url: `/work/delete-work-by-user`,
        method: "DELETE",
        params: { id, postID },
      }),
    }),
    getlistJobseeker: builder.query({
      query: () => ({
        url: "/user/get-list-employee",
      }),
      transformResponse: (response) => {
        console.log("redux receive getlistJobseeker", response);
        return response;
      },
    }),
  }),
});

export const {
  useGetCompanyInforQuery,
  useGetPostByUserQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetlistJobseekerQuery,
} = employerApi;
