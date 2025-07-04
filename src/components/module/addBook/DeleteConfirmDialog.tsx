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

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCancel: () => void;
  onConfirm: () => void;
  message?: string;
};

const ConfirmDialog = ({ open, setOpen, onCancel, onConfirm }: Props) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              "Do you really want to delete this book"
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' onClick={onCancel} className='cursor-pointer'>
                Cancel
              </Button>
            </DialogClose>
            <Button variant={'destructive'} onClick={onConfirm} className='cursor-pointer'>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
