import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Edit, Trash2 } from 'lucide-react';
import { useDeleteBookMutation, useGetBooksQuery } from '@/redux/api/baseApi';
import { type IBook } from '@/types';
import BookTableSkeleton from './bookTableSkeleton';
import { toast } from 'sonner';
import { useState } from 'react';
import ConfirmDialog from '../addBook/confirmDialog';
import PaginationAllBook from '../pagination/pagination';

const BooksTable = () => {
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const { data, isLoading } = useGetBooksQuery({page, limit});
  const [deleteBook] = useDeleteBookMutation();

  const totalPages = Math.ceil(data?.meta.total / data?.meta.limit) 
 
  const handleDelete = async () => {
    try {
      if (!selectedId) return;
      await deleteBook(selectedId).unwrap();
      toast.success('Book deleted!');
      setOpenConfirm(false);
    } catch (error) {
      toast.error('Failed to delete.');
      console.log(error);
    }
  };


  return (
  <div className='flex flex-col gap-5'>
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
        <ConfirmDialog
          open={openConfirm}
          setOpen={setOpenConfirm}
          onCancel={() => {
            setOpenConfirm(false);
            setSelectedId(null);
          }}
          onConfirm={handleDelete}
        />
        <TableBody className=''>
          {isLoading ? (
            <BookTableSkeleton data={data} />
          ) : (
            data.data.map((book: IBook) => (
              <TableRow
                key={book._id}
                className='hover:bg-gray-50 dark:hover:bg-gray-900 transition'
              >
                <TableCell
                  className='font-medium pl-[22px] hover:underline cursor-pointer'
                  onClick={() => {
                    navigate(`/books/${book._id}`);
                  }}
                >
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
                    onClick={() => {
                      setSelectedId(book._id);
                      setOpenConfirm(true);
                    }}
                  >
                    <Trash2 />
                  </Button>
                  {book.available ? (
                    <Link to={`/borrow/${book._id}`}>
                      <Button
                        variant={'ghost'}
                        size='sm'
                        disabled={!book.available}
                      >
                        <BookOpen />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant={'ghost'} size='sm' disabled>
                      <BookOpen />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
       </div>
      <PaginationAllBook 
        totalPages={totalPages} 
        currentPage={page} 
        onPageChange={(newPage)=> setPage(newPage)}
        />
    </div>
  );
};

export default BooksTable;
