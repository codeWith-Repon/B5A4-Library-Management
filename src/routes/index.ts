import App from "@/App";
import BookDetails from "@/pages/BookDetails";
import Books from "@/pages/Books";
import BorrowBook from "@/pages/BorrowBook";
import BorrowSummary from "@/pages/BorrowSummary";
import CreateBook from "@/pages/CreateBook";
import EditBook from "@/pages/Edit";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Books
            }, {
                path: "books",
                Component: Books
            },
            {
                path: "create-book",
                Component: CreateBook
            },
            {
                path: `/books/:id`,
                Component: BookDetails
            },
            {
                path: `edit-book/:bookId`,
                Component: EditBook
            },
            {
                path: `/borrow/:bookId`,
                Component: BorrowBook
            },
            {
                path: "borrow-summary",
                Component: BorrowSummary
            }
        ]
    }
])

export default router