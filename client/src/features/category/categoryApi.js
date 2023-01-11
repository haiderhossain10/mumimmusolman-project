import { api } from "../api/api";

export const categoryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                method: "GET",
                url: "/categories",
            }),
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryApi;
