import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import domain from '../config/domain';
export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: domain }),
  endpoints: (builder) => ({
    getIndustries: builder.query({
        query: () => '/category/getCategory_Industry',
        // transformResponse: (response) => {return response.data}
    }),
    getJobFunction: builder.query({
        query: () => '/category/getCategory_JobFunction'
    }),
    getBenefits: builder.query({
        query: () => '/category/getCatalog_Benefit'
    }),
    getNations: builder.query({
        query: () => '/category/getCategory_Nation'
    }),
    getCities: builder.query({
        query: (id) => ({
          url:`/category/getCategory_City`,
          params:  id })   
      }),
    getDistricts: builder.query({
        query: (id) => `/category/getCategory_District/${id}`
    }),
    getLanguages: builder.query({
      query: () => '/category/getCategory_Language'
    }),
    getLevels: builder.query({
      query: () => '/category/getCategory_Level'
    }),
    getScales: builder.query({
      query: () => '/category/getCategory_Scale'
    }),
    getEducation: builder.query({
      query: () => '/category/getCategory_Education'
    }),
    getTags: builder.query({
        query: () => '/category/getCategory_Tags'
      }),
    getTime: builder.query({
        query: () => '/category/get-time'
      }), 
  }),
});

export const {  useGetIndustriesQuery,useGetJobFunctionQuery,
                useGetBenefitsQuery, useGetNationsQuery, useGetCitiesQuery,
                useGetDistrictsQuery, useGetLanguagesQuery, useGetLevelsQuery,
                useGetScalesQuery,useGetTagsQuery, useGetEducationQuery,useGetTimeQuery
            } = categoryApi;