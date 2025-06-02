import './App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import UserLayout from './components/Layout/Layout'
import { Toaster } from './components/ui/toaster'

AOS.init()


function App() {
  return (
    <div>
        <UserLayout />
      <Toaster />
    </div>
  )
}

export default App
