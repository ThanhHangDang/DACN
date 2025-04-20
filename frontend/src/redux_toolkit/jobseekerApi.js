import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import domain from '../config/domain';

export const jobseekerApi = createApi({
    reducerPath: 'jobseekerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: domain,
        // prepareHeaders: (headers) => {
        //     const token = localStorage.getItem('token');
        //     // if (token) {
        //     //     headers.set('Authorization', `Bearer ${token}`);
        //     // }
        //     headers.set('Authorization');
        //     return headers;
        // },
        credentials: 'include'
    }), 
    tagTypes: ['Basic', 'Experience', 'Education', 'Project', 'Skill', 'Language', 'Certification'],
    endpoints: (builder) => ({
        getItemProfile: builder.query({
            query: ({type,profile_id}) => ({
                url:`/jobseeker/profile`,
                params: { type, profile_id},
            }),
            transformResponse: (response) => {
                return response.data;
            },
            providesTags: (result, error, { type }) => {
                return result ? [{ type }] : [];
            }
        }),
        
        // Thêm endpoint updateProfileImage
        updateProfileImage: builder.mutation({
            query: ({ id, image }) => {
                // Tạo FormData để upload file
                const formData = new FormData();
                formData.append("id", id);
                formData.append("image", image);
                
                return {
                    url: '/jobseeker/update-jobseeker-profile-image',
                    method: 'POST',
                    body: formData,
                    // Không cần set Content-Type vì fetchBaseQuery tự xử lý với FormData
                    formData: true // Đảm bảo xử lý đúng với FormData
                };
            },
            // Transform response để trả về dữ liệu như action cũ
            transformResponse: (response) => response.data,
            // Invalidate các tags liên quan để UI được cập nhật
            invalidatesTags: (result, error, { id }) => [
                { type: 'Basic', id }
            ]
        }),
        
        updateItemProfile: builder.mutation({
            query: ({ type, data }) => ({
                url: `/jobseeker/profile`,
                method: 'PUT',
                body: { type, data }, // Sửa lỗi cú pháp
            }),
            invalidatesTags: (result, error, { type }) => [{ type }],  
        }),
        
        addItemProfile: builder.mutation({
            query: ({ type, data }) => ({
                url: `/jobseeker/profile`,
                method: 'POST',
                body: { type, data }, // Sửa lỗi cú pháp
            }),
            invalidatesTags: (result, error, { type }) => [{ type }],  
        }),
        
        deleteItemProfile: builder.mutation({
            query: ({ type, data }) => ({
                url: `/jobseeker/profile`,
                method: 'DELETE',
                body: { type, data },
            }),
            invalidatesTags: (result, error, { type }) => [{ type }],  
        }),
    })   
});

// Export hooks for usage in components
export const {
    useGetItemProfileQuery,
    useUpdateProfileImageMutation,
    useUpdateItemProfileMutation,
    useAddItemProfileMutation,
    useDeleteItemProfileMutation    
} = jobseekerApi;
