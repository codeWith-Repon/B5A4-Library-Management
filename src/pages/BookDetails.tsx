import { useParams } from 'react-router-dom';
import { useGetBookByIdQuery } from '@/redux/api/baseApi';
import { Skeleton } from '@/components/ui/skeleton';

const BookDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBookByIdQuery(id);

  if (isLoading) return <div>
     <div className="max-w-4xl mx-auto mt-10">
      <Skeleton className='h-90 w-full' />
     </div>
  </div>;
  if (error || !data?.data) return <div className='text-center flex items-center justify-center m-auto min-h-screen text-9xl font-bold'>Book not found</div>;

  const book = data.data;
  

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
      <p className="dark:text-gray-400 text-black mb-1">Author: {book.author}</p>
      <p className="dark:text-gray-400 text-black mb-1">Genre: {book.genre}</p>
      <p className="dark:text-gray-400 text-black mb-1">ISBN: {book.isbn}</p>
      <p className="dark:text-gray-400 text-black mb-1">Copies: {book.copies}</p>
      <p className="dark:text-gray-400 text-black mb-1">
        Status:{' '}
        {book.available ? (
          <span className="text-green-600 font-semibold">Available</span>
        ) : (
          <span className="text-red-600 font-semibold">Unavailable</span>
        )}
      </p>
      {book.description && (
        <p className="mt-4 text-black dark:text-gray-400">{book.description}</p>
      )}
    </div>
  );
};

export default BookDetail;
