import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';
import type { IBook } from '@/types';

const BookTableSkeleton = ({ data }: { data?: { data: IBook[] } }) => {
  const count = data?.data?.length || 3;
  return [...Array(count)].map((_, i) => (
    <TableRow key={i}>
      <TableCell className='pl-[22px]'>
        <Skeleton className='h-4 w-[150px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-[120px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-[100px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-[130px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-[60px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-[90px]' />
      </TableCell>
      <TableCell className='text-right pr-[22px]'>
        <div className='flex justify-end gap-2'>
          <Skeleton className='h-8 w-8 rounded-md' />
          <Skeleton className='h-8 w-8 rounded-md' />
          <Skeleton className='h-8 w-8 rounded-md' />
        </div>
      </TableCell>
    </TableRow>
  ));
};

export default BookTableSkeleton;
