import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import domain from "../config/domain";

export const guestApi = createApi({
  reducerPath: "guestApi",
  baseQuery: fetchBaseQuery({ baseUrl: domain }),
  endpoints: (builder) => ({
    // Get company information by ID
    getCompanyInformation: builder.query({
      query: (id) => ({
        url: "guest/company-detail",
        params: {id} ,
      }),
      transformResponse: (response) => response,
    }),
    // Get all companies with pagination
    getCompanyBySearch: builder.query({
      query: (searchData={active_page:1,page_size:10}) => {
        console.log("Requesting getAllCompanies with page:", searchData);
        return {
          url: "/guest/companies",
          params: searchData,
        };    },
      transformResponse: (response) => { return response.data;},
    }),
    // Get company by ID
    getCompanyById: builder.query({
      query: (id) => ({
        url: `guest/company-detail`,
        params: { id },
      }),
      transformResponse: (response) => { return response.data;},
    }),
    // Get leading companies
    getLeadingCompanies: builder.query({
      query: (searchData={paging_size:10}) => ({
        url: "/guest/leading-company",
        params: searchData,
      }),
      transformResponse: (response) => {  return response.data;},
    }),
    // Get latest work/jobs
    getLatestWork: builder.query({
      query: (searchData = {paging_size:10}) => ({
        url: "/guest/jobs",
        params: searchData,
      }),    
      transformResponse: (response) => { 
        console.log("Requesting getLatestWork with searchData:", response);
        return response.data;},
    }),
    // Get all posts by search query
    getPostSearch: builder.query({
      query: (searchData = {paging_size:10}) => ({
        url: "/guest/jobs",
        params: searchData,
      }),
      transformResponse: (response) => { return response.data;},
    }),
    // Get post detail by ID
    getPostDetail: builder.query({
      query: (id) => ({
        url: "/guest/job-detail",
        params: { id },
      }),
      transformResponse: (response) => { return response.data;},
    }),
    // Get all posts by user ID
    getPostByUser: builder.query({
      query: (id) => ({
        url: "/guest/jobs-of-company",
        params: { id },
      }),
      transformResponse: (response) => { return response.data;},
    }),
  }),
});

export const {
 useGetCompanyInformationQuery,
 useGetCompanyBySearchQuery,
 useGetCompanyByIdQuery,
 useGetLeadingCompaniesQuery,
 useGetLatestWorkQuery,
 useGetPostSearchQuery,
 useGetPostDetailQuery,
 useGetPostByUserQuery
} = guestApi;
