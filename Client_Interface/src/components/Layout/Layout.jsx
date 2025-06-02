// make an admin layout

import UserHeader from '../UserHome/UserHeader'
import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Footer from './Footer'

import NotFound from './NotFound'
import ScrollToTop from '../ScrollToTop'

import About from '@/pages/About'
import ContactUs from '@/pages/ContactUs'
import TermsAndPrivacy from '@/pages/TermsAndPrivacy'
import AdminEntry from '@/pages/AdminEntry'
import AdminExit from '@/pages/AdminExit'
import { useAuth } from '@/context/UserAuthContext'
import AdminHome from '@/pages/AdminHome'
import MyBookings from '@/pages/MyBookings'

const Layout = () => {
  const { state } = useAuth()

  return (
    <div>
      <UserHeader />
      <ScrollToTop />
      <div className={`w-full`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />

          {state.user && state.user.user_type === 'admin' && (
            <>
              <Route path="/admin-entry" element={<AdminEntry />} />
              <Route path="/admin-exit" element={<AdminExit />} />
              <Route path="/admin" element={<AdminHome />} />
            </>
          )}
          {
            state.user && state.user.user_type === 'user' && (
              <>
                <Route path="/my-bookings" element={<MyBookings />} />
              </>
            )
          }
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms" element={<TermsAndPrivacy />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
