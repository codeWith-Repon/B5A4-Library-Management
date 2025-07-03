import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Edit, Trash2 } from 'lucide-react';
import { useDeleteBookMutation, useGetBooksQuery } from '@/redux/api/baseApi';
import { type IBook } from '@/types';
import BookTableSkeleton from './bookTableSkeleton';
import { toast } from 'sonner';

const BooksTable = () => {

  const { data, isLoading } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();

  

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      toast.success('Book deleted!');
    } catch (error) {
      toast.error('Failed to delete.');
      console.log(error);
    }
  };

  return (
    <div className='mt-4 w-full overflow-auto border border-gray-200 rounded-lg shadow dark:border-gray-800'>
      <Table>
        <TableCaption className='sr-only'>
          List of all books in the system.
        </TableCaption>
        <TableHeader>
          <TableRow className='bg-gray-100 dark:bg-gray-800'>
            <TableHead className='pl-[22px]'>Title</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead className='text-right pr-[22px]'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=''>
          {isLoading ? (
            <BookTableSkeleton data={data} />
          ) : (
            data.data.map((book: IBook) => (
              <TableRow
                key={book._id}
                className='hover:bg-gray-50 dark:hover:bg-gray-900 transition'
              >
                <TableCell className='font-medium pl-[22px]'>
                  {book.title}
                </TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell className=''>
                  {book.available ? (
                    <span className='text-green-600 font-medium'>
                      Available
                    </span>
                  ) : (
                    <span className='text-red-600 font-medium'>
                      Unavailable
                    </span>
                  )}
                </TableCell>
                <TableCell className='text-right pr-[22px]'>
                  <Link to={`/edit-book/${book._id}`}>
                    <Button variant={'ghost'} size='sm'>
                      <Edit />
                    </Button>
                  </Link>

                  <Button
                    variant={'ghost'}
                    size='sm'
                    className='hover:text-red-600'
                    onClick={() => handleDelete(book._id)}
                  >
                    <Trash2 />
                  </Button>
                  <Link to={`/borrow/${book._id}`}>
                    <Button variant={'ghost'} size='sm'>
                      <BookOpen />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BooksTable;
