import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};
const PaginationAllBook = ({
  totalPages,
  currentPage,
  onPageChange,
}: Props) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 ? (
            <PaginationPrevious className='cursor-pointer' onClick={() => onPageChange(currentPage - 1)} />
          ) : (
            <PaginationPrevious className='opacity-50 cursor-default' />
          )}
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i + 1);
              }}
              isActive={i + 1 === currentPage}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          {totalPages > currentPage ? (
            <PaginationNext className='cursor-pointer' onClick={() => onPageChange(currentPage + 1)} />
          ) : (
            <PaginationNext className='opacity-50 cursor-default' />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationAllBook;
