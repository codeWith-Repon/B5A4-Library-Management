import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAddBookMutation } from '@/redux/api/baseApi';
import type { IBook, IBookFormData } from '@/types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type Props = {
  defaultValues?: IBook | null; // null means add, otherwise edit
};

const AddBookModal = ({ defaultValues }: Props) => {
  const form = useForm<IBookFormData>({
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      isbn: '',
      description: '',
      copies: 0,
    },
  });
  const navigate = useNavigate();
  const [addBook] = useAddBookMutation();

  const onSubmit = async (data: IBookFormData) => {
    try {
      data.available = true;
      data.copies = Number(data.copies);

      await addBook(data).unwrap();
      toast.success('Book added successfully!');
      navigate('/books');

      form.reset();
    } catch (error) {
      toast.error('Failed to add book.');
      console.log(error);
    }
  };

  return (
    <div>
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

          <Button type='submit'>
            {defaultValues?._id ? 'Update Book' : 'Add Book'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddBookModal;
