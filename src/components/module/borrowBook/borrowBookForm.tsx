import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  useBorrowBookMutation,
  useGetBookByIdQuery,
} from '@/redux/api/baseApi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

type BorrowFormData = {
  quantity: number;
  duedate: Date;
};

const BorrowBookForm = () => {
  const form = useForm<BorrowFormData>();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [borrowBook] = useBorrowBookMutation();

  const { bookId } = useParams();

  const { data, isLoading } = useGetBookByIdQuery(bookId);
  console.log(data);
  const onSubmit = async (data: BorrowFormData) => {
    try {
      if (!bookId) return;

      const payload = {
        book: bookId,
        quantity: Number(data.quantity),
        dueDate: data.duedate.toISOString(),
      };
      await borrowBook(payload).unwrap();
      toast.success('Book borrowed successfully!');
      navigate('/borrow-summary');
    } catch (error) {
      toast.error('Failed to borrow book.');
      console.log(error);
    }
  };

  return (
    <div className='max-w-7xl mx-auto p-4 mt-10 border border-gray-200 rounded-lg shadow dark:border-gray-800'>
      <p className='mb-3 font-semibold'>
        Book name:{' '}
        <span className='font-bold '>
          {isLoading ? 'Loading...' : data?.data?.title}
        </span>
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='quantity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min={1}
                    placeholder='Quantity'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='duedate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Popover {...field} open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        id='date'
                        className='w-full justify-between font-normal'
                      >
                        {field.value
                          ? field.value.toLocaleDateString()
                          : 'Select date'}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-auto overflow-hidden p-0'
                      align='start'
                    >
                      <Calendar
                        mode='single'
                        selected={field.value}
                        captionLayout='dropdown'
                        disabled={(date) => date < new Date()}
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />

          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default BorrowBookForm;
