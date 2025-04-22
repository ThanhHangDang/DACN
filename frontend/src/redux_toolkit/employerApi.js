import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import domain from "../config/domain";
import { use } from "react";

export const employerApi = createApi({
  reducerPath: "employerApi",
  baseQuery: fetchBaseQuery({ baseUrl: domain }),
  endpoints: (builder) => ({
    getCompanyInfor: builder.query({
      query: (employer_id) => ({
        url: "/employer/profile",
        params: { employer_id },
      }),
      transformResponse: (response) => response.data,
    }),
    updateCompanyInfor: builder.mutation({
      query: (body) => ({
        url: "/employer/profile",
        method: "PUT",
        body,
      }),
      transformResponse: (response) => {
        console.log("redux receive updateCompanyInfor", response);
        return response;
      },
    }),
    addCompanyInfor: builder.mutation({
      query: (body) => ({
        url: "/employer/profile",
        method: "Post",
        body,
      }),
      transformResponse: (response) => {
        console.log("redux receive addCompanyInfor", response);
        return response;
      },
    }),
    deleteCompanyInfor: builder.mutation({
      query: (body) => ({
        url: "/employer/profile",
        method: "DELETE",
        body,
      }),
      transformResponse: (response) => {
        console.log("redux receive deleteCompanyInfor", response);
        return response;
      },
    }),



    getJobByUser: builder.query({
      query: (employer_id) => ({
        url: "/employer/jobs",
        params: { employer_id },
      }),
      transformResponse: (response) => {
        console.log("redux receive getJobByUser", response);
        return response.data;
      },
    }),
    addJob: builder.mutation({
      query: (body) => ({
        url: "/employer/job",
        method: "post",
        body,
      }),
      transformResponse: (response) => {
        console.log("redux receive addJob", response);
        return response;
      },
    }),
    updateJob: builder.mutation({
      query: (body) => ({
        url: "/employer/job",
        method: "PUT",
        body,
      }),
      transformResponse: (response) => {
        console.log("redux receive updateJob", response);
        return response;
      },
    }),
    deleteJob: builder.mutation({
      query: ({ employer_id, job_id }) => ({
        url: `/employer/job`,
        method: "DELETE",
        params: { employer_id, job_id },
      }),
      transformResponse: (response) => {
        console.log("redux receive deleteJob", response);
        return response;
      },
    }),




    getlistJobseeker: builder.query({
      query: (searchData={page_size:10}) => ({
        url: "/employer/jobseekers",
        params: searchData,
      }),
      transformResponse: (response) => {
        console.log("redux receive getlistJobseeker", response);
        return response.data;
      },
    }),
    getJobseekerDetail: builder.query({
      query: (jobseeker_id) => ({
        url: "/employer/jobseeker-detail",
        params: { jobseeker_id },
      }),
      transformResponse: (response) => {
        console.log("redux receive getJobseekerById", response);
        return response.data;
      },
  }),


    getListCandidate: builder.query({
      query: (employer_id) => ({
        url: "/employer/candidates",
        params: {employer_id},
      }),
      transformResponse: (response) => {
        console.log("redux receive getListCandidate", response);
        return response.data;
      },
    }),
    addCandidate: builder.mutation({
      query: ( { employer_id, jobseeker_id } ) => ({
        url: "/employer/candidate",
        method: "post",
        body: { employer_id, jobseeker_id } ,
      }),
      transformResponse: (response) => {
        console.log("redux receive addCandidate", response);
        return response;
      },
    }),
    deleteCandidate: builder.mutation({
      query: ( { employer_id, jobseeker_id } ) => ({
        url: "/employer/candidate",
        method: "DELETE",
        body: { employer_id, jobseeker_id } ,
      }),
      transformResponse: (response) => {
        console.log("redux receive deleteCandidate", response);
        return response;
      },
    }),
    rateCandidate: builder.mutation({
      query: ( { application_id, employer_id, rating }) => ({
        url: "/employer/candidate",
        method: "PUT",
        body: { application_id, employer_id, rating },
      }),
      transformResponse: (response) => {
        console.log("redux receive rateCandidate", response);
        return response;
      },
    }),




    getJobseekerApplied: builder.query({
      query: ({ employer_id, job_id } ) => ({
        url: "/employer/job-applied",
        params: { employer_id, job_id } ,
      }),
      transformResponse: (response) => {
        console.log("redux receive getJobseekerApplied", response);
        return response.data;
      },
    }),
    deleteJobseekerApplied: builder.mutation({
      query: ( { employer_id,job_id,jobseeker_id} ) => ({
        url: "/employer/job-applied",
        method: "DELETE",
        body: { employer_id,job_id,jobseeker_id} ,
      }),
      transformResponse: (response) => {
        console.log("redux receive deleteJobseekerApplied", response);
        return response;
      },
    }),



    inviteCandidateApplyJob: builder.mutation({
      query: ( { employer_id, job_id, jobseeker_id } ) => ({
        url: "/employer/invite",
        method: "post",
        body: { employer_id, job_id, jobseeker_id } ,
      }),
      transformResponse: (response) => {
        console.log("redux receive inviteCandidate", response);
        return response;
      },
    }),
})
});

export const {
  useGetCompanyInforQuery,
  useUpdateCompanyInforMutation,
  useAddCompanyInforMutation,
  useDeleteCompanyInforMutation,
  useGetJobByUserQuery,
  useAddJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetlistJobseekerQuery,
  useGetJobseekerDetailQuery,
  useGetListCandidateQuery,
  useAddCandidateMutation,
  useDeleteCandidateMutation,
  useRateCandidateMutation,
  useGetJobseekerAppliedQuery,
  useDeleteJobseekerAppliedMutation,
  useInviteCandidateApplyJobMutation,
  

} = employerApi;
