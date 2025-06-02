import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { LoginSignup } from './LoginSignup'
import logo from '../../assets/logo.png'

export function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8 rounded-md px-2 text-xs" variant="default">
          Login/Signup
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-md: max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="max-md:hidden">
            <div className="flex justify-center items-center">
              <img src={logo} alt="Logo" className="h-8 mb-1 w-8 mr-2" />
              <span className="text-2xl">SmartPark</span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center">
            Login or Signup to book a parking spot
          </DialogDescription>
        </DialogHeader>
        <LoginSignup />
      </DialogContent>
    </Dialog>
  )
}
