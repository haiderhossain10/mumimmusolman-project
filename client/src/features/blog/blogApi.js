import { api } from "../api/api";

export const blogApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: ({ page, limit }) => ({
                method: "GET",
                url: `/blogs?page=${page}&limit=${limit}`,
            }),
        }),
        getBlog: builder.query({
            query: (slug) => ({
                method: "GET",
                url: `/blog/${slug}`,
            }),
        }),
        addPost: builder.mutation({
            query: (body) => ({
                url: "/blog",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useGetBlogsQuery, useGetBlogQuery, useAddPostMutation } =
    blogApi;
