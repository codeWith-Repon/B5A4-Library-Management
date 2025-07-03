import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000/api` }),
    tagTypes: ['books', 'borrowedBooks'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => `/books/`,
            providesTags: ['books']
        }),
        getBookById: builder.query({
            query: (id) => `/books/${id}`
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['books']
        }),
        addBook: builder.mutation({
            query: (data) => ({
                url: "/books/",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["books"]
        }),
        editBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `/books/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['books']
        }),
        borrowBook: builder.mutation({
            query: (data) => ({
                url: "/borrow",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['books', "borrowedBooks"]
        }),
        borrowBookSummary: builder.query({
            query: () => "/borrow",
            providesTags: ['borrowedBooks'],
        })
    }),

})


export const {
    useGetBooksQuery,
    useGetBookByIdQuery,
    useDeleteBookMutation,
    useAddBookMutation,
    useEditBookMutation,
    useBorrowBookMutation,
    useBorrowBookSummaryQuery
} = baseApi