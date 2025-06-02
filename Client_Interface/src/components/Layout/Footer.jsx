// import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'
// import { Twitter, Instagram, Facebook } from 'lucide-react'
import logo from '../../assets/logo.png'
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className=" lg:mx-16 flex flex-col md:flex-row justify-around items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <div className="mb-4 md:mb-0 justify-center md:justify-normal flex items-center">
            <img
              src={logo}
              alt="CampusTradeHub Logo"
              className="w-8 h-8 mr-2"
            />
            <h2 className="text-2xl font-bold">SmartPark</h2>
          </div>
          <p className="text-gray-400 mt-2">
            Real-Time Vehicle Parking System.
          </p>
        </div>
        {/* <div className="flex flex-col items-center mt-8 md:mt-0 mx-auto md:mx-0">
          <div className="flex items-center mb-4 space-x-4">
            <a
              href="https://twitter.com/yourtwitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-8 w-8 hover:text-primary" />
            </a>
            <a
              href="https://instagram.com/yourinstagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-8 w-8 hover:text-primary" />
            </a>
            <a
              href="https://facebook.com/yourfacebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-8 w-8 hover:text-primary" />
            </a>
          </div>
          <div>
            Designed with <span className="text-red-500">❤️</span> by{' '}
            <Link to={'/about'} className="font-semibold underline">
              CampusTradeHub Team
            </Link>
          </div>
        </div> */}
        <div className="flex flex-col mt-8 md:mt-0 mx-auto md:mx-0">
          <p className="text-gray-400 mb-4">
            &copy; {2023} SmartPark. All rights reserved.
          </p>
          <nav className="flex items-center space-x-4 md:mt-0 mx-auto md:mx-0">
            {/* <Link to="/about" className="hover:text-gray-400">
              About Us
            </Link> */}
            <Link to="/contact" className="hover:text-gray-400">
              Contact
            </Link>
            <Link to="/terms" className="hover:text-gray-400">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
