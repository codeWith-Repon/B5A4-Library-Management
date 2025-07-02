import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAddBookMutation, useEditBookMutation } from '@/redux/api/baseApi';
import type { IBook, IBookFormData } from '@/types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  defaultValues?: IBook | null; // null means add, otherwise edit
};

const AddBookModal = ({ open, setOpen, defaultValues }: Props) => {
  const form = useForm<IBookFormData>({
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      isbn: '',
      description: '',
      copies: 1
    },
  });
  const [addBook] = useAddBookMutation();
  const [editBook] = useEditBookMutation();

  // Pre-fill when editing
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const onSubmit = async (data: IBookFormData) => {
    try {
      data.available = true;
      data.copies = Number(data.copies);

      if (defaultValues?._id) {
        await editBook({ id: defaultValues._id, data }).unwrap();
        toast.success('Book updated successfully!');
      } else {
        await addBook(data).unwrap();
        toast.success('Book added successfully!');
      }

      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error('Failed to add book.');
      console.log(error);
    }
  };

  return (
    <div>
      {' '}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add Book</DialogTitle>
            <DialogDescription className='sr-only'>add book</DialogDescription>
          </DialogHeader>
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

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant='outline'>Cancel</Button>
                </DialogClose>
                <Button type='submit'>
                  {defaultValues?._id ? 'Update Book' : 'Add Book'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBookModal;
