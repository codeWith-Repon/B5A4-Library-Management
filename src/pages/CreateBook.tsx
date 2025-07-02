import AddBookModal from '@/components/module/addBook/addBookModal';
import BooksTable from '@/components/module/books/booksTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const CreateBook = () => {
  const [Open, setOpen] = useState(false);
  return (
    <div className='mx-auto max-w-7xl mt-5'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>Add a Book</h2>
        <Button onClick={() => setOpen(true)}>
          Add Book
          <Plus />
        </Button>
      </div>

      <AddBookModal open={Open} setOpen={setOpen} />
      <BooksTable />
    </div>
  );
};

export default CreateBook;
