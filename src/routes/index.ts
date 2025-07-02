import App from "@/App";
import Books from "@/pages/Books";
import BorrowSummary from "@/pages/BorrowSummary";
import CreateBook from "@/pages/CreateBook";
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
                path: "borrow-summary",
                Component: BorrowSummary
            }
        ]
    }
])

export default router