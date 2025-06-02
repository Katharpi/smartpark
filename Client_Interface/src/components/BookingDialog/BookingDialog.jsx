import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
//   DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import BookingForm from './BookingForm'

export function BookingDialog({space_name,id}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8 my-8 rounded-md px-2 text-xs bg-blue-600 hover:bg-blue-700" variant="default">
         Reserve
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-md: max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="max-md:hidden">
            <div className="flex justify-center items-center">
              <span className="text-2xl"> Book Slot {space_name}</span>
            </div>
          </DialogTitle>
          <BookingForm id={id}  />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
