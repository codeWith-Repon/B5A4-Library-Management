import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { TableCell } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useEditBookMutation, useGetBookByIdQuery } from '@/redux/api/baseApi';
import { type IBook } from '@/types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const Edit = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const form = useForm<IBook>();

  const [editBook] = useEditBookMutation();
  const { data: bookData, isLoading } = useGetBookByIdQuery(bookId);

  useEffect(() => {
    if (bookData) {
      form.reset(bookData.data);
    }
  }, [bookData, form]);

  const onSubmit = async (data: IBook) => {
    try {
      if (!bookId) {
        toast.error('Missing book ID!');
        return;
      }
      const updatedBook = {
        ...data,
        available: true,
        copies: Number(data.copies),
      };

      await editBook({ id: bookId, data: updatedBook }).unwrap();
      toast.success('Book updated successfully!');

      navigate('/books');
    } catch (error) {
      toast.error('Failed to add book.');
      console.log(error);
    }
  };

  return (
    <div className='mx-auto max-w-5xl mt-5 border border-gray-200 rounded-lg shadow dark:border-gray-800 p-4'>
      {isLoading ? (
        <div className='flex flex-col gap-3'>
          <TableCell>
            <Skeleton className='h-4 w-[150px]' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-[120px]' />
          </TableCell>
          <TableCell className=''>
            <Skeleton className='h-4 w-[150px]' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-[120px]' />
          </TableCell>
          <TableCell className=''>
            <Skeleton className='h-4 w-[150px]' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-[120px]' />
          </TableCell>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Title' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='author'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder='Author' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='genre'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Input placeholder='Genre' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isbn'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder='ISBN' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Description' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='copies'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='Copies' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type='submit'>Update Book</Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default Edit;
