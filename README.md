# Library Management System

A full-stack Library Management System built with:

- **Frontend:** React, TypeScript, Redux Toolkit Query, Tailwind CSS, ShadCN/UI
- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose

Live Links:

- 🌐 [Client](https://library-management-api-s.vercel.app)
- 🌐 [Server](https://library-client-omega.vercel.app)

---

## 🛠 Features

### ✅ Book Management (CRUD)

- Add new books
- Edit book information
- Delete books with confirmation
- View all books with pagination and sorting
- Detailed view for each book

### ✅ Borrow Book

- Borrow a specific number of copies
- Select due date using ShadCN calendar
- Copies update automatically after borrow
- Validation: can't borrow more than available

### ✅ Borrow Summary

- View all borrowed books in a summary table
- Includes borrow date, due date, and quantity

### ✅ Pagination

- Paginated books list with ellipsis support

### ✅ Dynamic Routes

- `/books/:id` — Detailed book info
- `/edit-book/:id` — Book update form
- `/borrow/:bookId` — Borrow form

---

---

## Project Setup

### Backend Setup

- Clone the backend repo
  - git clone https://github.com/codeWith-Repon/B5A3-library-management-apis.git
- Go into the backend directory
  - cd B5A3-library-management-apis
- Install dependencies

  - npm install

- Create a .env file in the root with the following content:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

```bash
# Run the server
npm run dev
```

Server will start at http://localhost:5000

### Frontend Setup

- Clone the frontend repo
  - git clone https://github.com/codeWith-Repon/B5A4-Library-Management-Client.git
- Go into the client directory
  - cd B5A4-Library-Management-Client
- Install dependencies
  - npm install
- Create a .env file in the root with the following content:

```bash
VITE_API_URL=http://localhost:5000/api
```

```bash
# Run the development server
npm run dev
```

Client will start at http://localhost:5173

Author

- Md Repon — [GitHub Profile](https://github.com/codeWith-Repon)
