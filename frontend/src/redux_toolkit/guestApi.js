import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import domain from '../config/domain';

export const guestApi = createApi({
  reducerPath: 'guestApi',
  baseQuery: fetchBaseQuery({ baseUrl: domain }),
  endpoints: (builder) => ({
    // Get company information by ID
    getCompanyInformation: builder.query({
      query: (id) => ({
        url: '/user/get-employer-information',
        params: { id }
      }),
      transformResponse: (response) => response.companyInfor,
    }),
    
    // Get all companies with pagination
    getAllCompanies: builder.query({
      query: (page = 1) => ({
        url: '/company/get-all-company',
        params: { page }
      }),
    }),
    
    // Get company by ID
    getCompanyById: builder.query({
      query: (id) => ({
        url: `/company/get-company-by-id`,
        params: { id }
      }),
      transformResponse: (response) => response.company,
    }),
    
    // Get leading companies
    getLeadingCompanies: builder.query({
      query: () => '/company/get-leading-company',
      transformResponse: (response) => response.company,
    }),
    
    // Get latest work/jobs
    getLatestWork: builder.query({
      query: () => '/work/get-latest-work',
      transformResponse: (response) => response.work,
    }),
  }),
});

export const { 
  useGetCompanyInformationQuery,
  useGetAllCompaniesQuery,
  useGetCompanyByIdQuery,
  useGetLeadingCompaniesQuery,
  useGetLatestWorkQuery,
} = guestApi;