import AddBookModal from '@/components/module/addBook/addBookModal';

const CreateBook = () => {
  return (
    <div className='mx-auto max-w-7xl mt-5'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>Add a Book</h2>
      </div>

      <AddBookModal />
    </div>
  );
};

export default CreateBook;
