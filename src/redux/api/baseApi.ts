import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000/api/books` }),
    tagTypes: ['books'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => `/`,
            providesTags: ['books']
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['books']
        }),
        addBook: builder.mutation({
            query: (data) => ({
                url: "/",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["books"]
        }),
        editBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['books']
        })
    }),

})


export const {
    useGetBooksQuery,
    useDeleteBookMutation,
    useAddBookMutation,
    useEditBookMutation
} = baseApi