import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-10 border-t'>
      <div className='max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4'>
        <p className='text-sm'>
          &copy; {new Date().getFullYear()} ScriptNinja Library. All rights
          reserved.
        </p>
        <div className="flex gap-4 text-sm">
          <Link to="/books" className="hover:underline">
            Books
          </Link>
          <Link to="/create-book" className="hover:underline">
            Add Book
          </Link>
          <Link to="/borrow-summary" className="hover:underline">
            Borrow Summary
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
