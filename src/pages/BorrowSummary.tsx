import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useBorrowBookSummaryQuery } from '@/redux/api/baseApi';
import type { IBook } from '@/types';

const BorrowSummary = () => {
  const { data, isLoading } = useBorrowBookSummaryQuery(undefined);

  return (
    <div className='mt-4 max-w-7xl mx-auto overflow-auto border border-gray-200 rounded-lg shadow dark:border-gray-800'>
      <Table>
        <TableCaption className='sr-only'>List of borrow books.</TableCaption>
        <TableHeader className=''>
          <TableRow className='bg-gray-100 dark:bg-gray-800'>
            <TableHead className='pl-[22px]'>Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead className='text-center'>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=''>
          {isLoading ? (
            <TableRow>
              <TableCell className='pl-[22px]'>
                <Skeleton className='h-4 w-[200px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-[200px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-[200px]' />
              </TableCell>
            </TableRow>
          ) : (
            data?.data.map(
              (book: { book: IBook; totalQuantity: number }, i: number) => (
                <TableRow key={i}>
                  <TableCell className='font-medium pl-[22px]'>
                    {book.book.title}
                  </TableCell>
                  <TableCell>{book.book.isbn}</TableCell>
                  <TableCell className='text-center'>
                    {book.totalQuantity}
                  </TableCell>
                </TableRow>
              )
            )
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className='pl-[10px]'>
              Total Quantity
            </TableCell>
            <TableCell className='text-center font-bold'>
              {isLoading ? (
                <TableRow>
                  <TableCell>
                    <Skeleton className='h-4 w-[200px]' />
                  </TableCell>
                </TableRow>
              ) : (
                data?.data.reduce(
                  (acc: number, curr: { book: IBook; totalQuantity: number }) =>
                    acc + curr.totalQuantity,
                  0
                )
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default BorrowSummary;
