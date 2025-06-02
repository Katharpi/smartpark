// import { Button } from '../ui/button'
// import {
//   Sheet,
//   SheetClose,
//   // SheetClose,
//   SheetContent,
//   SheetTrigger,
// } from '@/components/ui/sheet'
// import { ChevronDown, Menu } from 'lucide-react'
// import ProfileButton from '../ui/ProfileButton'
import Container from '../ui/Container'
import { Link } from 'react-router-dom'
import ThemeToggler from '../ThemeToggle'
import logo from '../../assets/logo.png'
// import { SearchBtnPopUp } from './SearchButtonPopUp'
import { useAuth } from '@/context/UserAuthContext'
import { LoginDialog } from '../LoginSignup/LoginDialog'
// import { Button } from '../ui/button'
import ProfileButton from '../ui/ProfileButton'
import { Button } from '../ui/button'
import { useState } from 'react'

const Header = () => {
  const { state } = useAuth()

  const [isEntryORExit, setIsEntryORExit] = useState('entry')


  // const [isDropdownOpen, setDropdownOpen] = useState(false)

  // const handleMouseEnter = () => {
  //   setDropdownOpen(true)
  // }

  // const handleMouseLeave = () => {
  //   setDropdownOpen(false)
  // }

  // const toggleDropdown = () => {
  //   setDropdownOpen(!isDropdownOpen)
  // }

  return (
    <Container>
      <header
        className={`w-full bg-opacity-90 shadow-lg backdrop-filter backdrop-blur-md py-3 px-4 lg:px-8 border-b transition-all duration-300 ease-in-out`}
      >
        <div className="relative pr-2 sm:px- lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex justify items-center">
            {/* <Sheet>
              <SheetTrigger>
                <Menu className="h-6 mx-2 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex py-6 flex-col gap-4">
                  <div>
                    <Link
                      to={'/products/all'}
                      className="block px-2 py-1 font-semibold text-lg"
                    >
                      <SheetClose>Products</SheetClose>
                    </Link>
                  </div>
                  <div>
                    <div
                      onClick={toggleDropdown}
                      className="relative inline-block text-left"
                    >
                      <div
                        id="dropdownHoverButton"
                        className="flex items-center px-2 py-1 font-semibold text-lg"
                      >
                        <span className="font-semibold text-lg">
                          Categories
                        </span>
                        <ChevronDown
                          size={20}
                          className={`ml-2 transition-transform duration-300 ease-in-out ${
                            isDropdownOpen ? 'rotate-[-180deg]' : 'rotate-0'
                          }`}
                        />
                      </div>

                      {isDropdownOpen && (
                        <div
                          id="dropdownHover"
                          className="z-10 absolute top-full left-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                        >
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                              <Link
                                to="/products/books"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <SheetClose>Books</SheetClose>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/products/electronics"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <SheetClose>Electronics</SheetClose>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/products/appliances"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <SheetClose>Appliances</SheetClose>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/products/clothing"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <SheetClose>Clothing</SheetClose>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/products/sports"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <SheetClose>Sports and fitness</SheetClose>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/products/free"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <SheetClose>Free Items</SheetClose>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Link
                      to={'/new-product'}
                      className="block px-2 py-1 font-semibold text-lg"
                    >
                      <SheetClose>Sell Your Product</SheetClose>
                    </Link>
                  </div>
                  {state.isLoggedIn && (
                    <div>
                      <Link
                        to={'/sales-inbox'}
                        className="block px-2 py-1 font-semibold text-lg"
                      >
                        <SheetClose>Sales Inbox</SheetClose>
                      </Link>
                    </div>
                  )}
                  {!state.isLoggedIn && (
                    <div>
                      <Link
                        to={'/about'}
                        className="block px-2 py-1 font-semibold text-lg"
                      >
                        <SheetClose>About Us</SheetClose>
                      </Link>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet> */}
            <div>
              <Link to={'/'}>
                <img
                  className="max-[390px]:hidden w-10 h-10 lg:w-10 lg:h-10  mr-4 mb-2"
                  src={logo}
                  alt="logo"
                />
              </Link>
            </div>
            <h1 className="text-2xl hidden lg:block font-bold">
              <Link to={'/'} className="ml-4 lg:ml-0">
                SmartPark: Real Time Vehicle Parking System
              </Link>
            </h1>
            <nav className="mx-6 items-center justify-end space-x-4 lg:space-x-6 hidden md:flex">
              {/* dropdown */}
              {/* <div>
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative inline-block text-left"
                >
                  <Button
                    variant="ghost"
                    id="dropdownHoverButton"
                    className="text-md  hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <span className="text-sm font-medium  ">Categories</span>
                    <ChevronDown
                      size={20}
                      className={`ml-2 transition-transform duration-300 ease-in-out ${
                        isDropdownOpen ? 'rotate-[-180deg]' : 'rotate-0'
                      }`}
                    />
                  </Button>

                  {isDropdownOpen && (
                    <div
                      id="dropdownHover"
                      className="z-10 absolute top-full left-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <Link
                            to="/products/books"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Books
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products/electronics"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Electronics
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products/appliances"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Appliances
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products/clothing"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Clothing
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products/sports"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Sports and fitness
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products/donations"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Free Items
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div> */}
              {/* dropdown end */}
              {/* <div>
                <Button
                  asChild
                  variant="ghost"
                  className="text-md  hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Link
                    to={'/new-product'}
                    className="text-sm font-medium transition-colors "
                  >
                    Sell Your Product
                  </Link>
                </Button>
              </div> */}
              {/* {state.isLoggedIn && (
                <div>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-md  hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Link
                      to={'/sales-inbox'}
                      className="text-sm font-medium transition-colors "
                    >
                      Sales Inbox
                    </Link>
                  </Button>
                </div>
              )}
              {!state.isLoggedIn && (
                <div>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-md  hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Link
                      to={'/about'}
                      className="text-sm font-medium transition-colors "
                    >
                      About Us
                    </Link>
                  </Button>
                </div>
              )} */}
            </nav>
          </div>
          <div className="flex items-center">
            {/* <SearchBtnPopUp /> */}

            {state && state.user && state.user.user_type === 'user' && (
              <div>
                <Button
                  asChild
                  variant="ghost"
                  className="text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Link
                    to={'/my-bookings'}
                    className="text-sm font-medium transition-colors "
                  >
                    My Bookings
                  </Link>
                </Button>
              </div>
            )}
            {state && state.user && state.user.user_type === 'admin' && (
              <div
                className=" 
                    flex items-center space-x-4
              "
              >
                <Button
                  asChild
                  variant="ghost"
                  className={`text-lg font-semibold ${
                    isEntryORExit === 'entry' ? 'bg-gray-100 dark:bg-gray-800' : ''
                  }  hover:bg-gray-100 dark:hover:bg-gray-800 `}
                  onClick={() => setIsEntryORExit('entry')}
                >
                  <Link
                    to={'/admin-entry'}
                    className="text-sm font-medium transition-colors "
                  >
                    Vehicle Entry
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className={`text-lg font-semibold ${
                    isEntryORExit === 'exit' ? 'bg-gray-100 dark:bg-gray-800' : ''
                  } hover:bg-gray-100 dark:hover:bg-gray-800`}
                  onClick={() => setIsEntryORExit('exit')}
                >
                  <Link
                    to={'/admin-exit'}
                    className="text-sm font-medium transition-colors "
                  >
                    Vehicle Exit
                  </Link>
                </Button>
              </div>
            )}

            <ThemeToggler />
            {state.isLoggedIn ? <ProfileButton /> : <LoginDialog />}
          </div>
        </div>
      </header>
    </Container>
  )
}

export default Header
