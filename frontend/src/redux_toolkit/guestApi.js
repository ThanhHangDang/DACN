import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import domain from "../config/domain";
import { get } from "jquery";

export const guestApi = createApi({
  reducerPath: "guestApi",
  baseQuery: fetchBaseQuery({ baseUrl: domain }),
  endpoints: (builder) => ({
    // Get company information by ID
    getCompanyInformation: builder.query({
      query: (id) => ({
        url: "/user/get-employer-information",
        params: { id },
      }),
      transformResponse: (response) => response.companyInfor,
    }),
    // Get all companies with pagination
    getAllCompanies: builder.query({
      query: (page = 1) => {
        console.log("Requesting getAllCompanies with page:", page);
        return {
          url: "/company/get-all-company",
          params: { page },
        };
      },
    }),
    // Get company by ID
    getCompanyById: builder.query({
      query: (id) => ({
        url: `/company/get-company-by-id`,
        params: { id },
      }),
      transformResponse: (response) => response,
    }),
    // Get leading companies
    getLeadingCompanies: builder.query({
      query: () => ({
        url: "/company/get-leading-company",
      }),
      transformResponse: (response) => {
        // console.log("redux receive getLeadingCompanies",response);
        return response.data;},
    }),
    // Get latest work/jobs
    getLatestWork: builder.query({
      query: () => ({
        url: "/work/get-latest-work",
      }),
      transformResponse: (response) => {
        // console.log("redux receive getLatestWork",response);
        return response.data;},
    }),
    // Get all posts with pagination
    getAllPost: builder.query({
      query: (page = 1) => ({
        url: "/work/get-all-post",
        params: { page },
      }),
    }),
    // Get all posts by search query
    getPostSearch: builder.query({
      query: (search = {}) => ({
        url: "/work/get-works-by-search",
        params: search,
      }),
    }),
    // Get post detail by ID
    getPostDetail: builder.query({
      query: (post_id) => ({
        url: "/work/get-post-detail",
        params: { post_id },
      }),
    }),
    // Get all posts by user ID
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
  }),
});

export const {
 useGetCompanyInformationQuery,
 useGetAllCompaniesQuery,
 useGetCompanyByIdQuery,
 useGetLeadingCompaniesQuery,
 useGetLatestWorkQuery,
 useGetAllPostQuery,
 useGetPostSearchQuery,
 useGetPostDetailQuery,
 useGetPostByUserQuery
} = guestApi;
