import type { IBook } from "@/types";

export const dummyBooks: IBook[] = [
    {
        _id: "1",
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Adventure",
        isbn: "9780061122415",
        copies: 5,
        available: true,
    },
    {
        _id: "2",
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        isbn: "9780451524935",
        copies: 0,
        available: false,
    },
];
