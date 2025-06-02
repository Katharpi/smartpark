// import { useEffect } from 'react'

import ParkingMap from '@/components/ParkingLiveMap/ParnkingMap'
import KeyFeatures from '@/components/UserHome/KeyFeatures'
import ParkingAvailabilty from '@/components/UserHome/PakingAvailability'
import Aos from 'aos'
import { Clock1, ParkingSquare, SearchCheck } from 'lucide-react'
import { useEffect } from 'react'


const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 })
  }, [])

  return (
    <div className="lg:mx-20 min-h-screen">
      <div data-aos="fade-up" className="flex flex-col md:flex-row  mt-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-center my-8">
            Welcome to{' '}
            <span className="bg-primary text-gray-100 px-4 transform -skew-x-12 mt-3 inline-block">
              {' '}
              SmartPark!
            </span>
          </h1>

          <p className="my-8 lg:my-8 text-center md:text-justify  max-sm:px-10 text-base xl:text-lg">
            SmartPark is a cutting-edge parking management system leveraging
            state-of-the-art Automatic Number Plate Recognition (ANPR)
            technology to streamline parking operations. Designed to enhance
            convenience, efficiency, and security, SmartPark offers real-time
            updates on parking availability and automates vehicle entry and exit
            processes.
          </p>

          <p className="my-8 lg:my-8 text-center md:text-justify  max-sm:px-10 text-base xl:text-lg">
            Gone are the days of circling parking lots in search of a space.
            With SmartPark, users can seamlessly navigate to available parking
            spots through a user-friendly web interface. The system employs
            computer vision techniques to capture and recognize vehicle plate
            numbers instantly, facilitating smooth entry and exit for vehicles.
          </p>

          {/* steps to book */}
          <h3 className="text-2xl font-bold text-center my-8">Steps to Book</h3>
          <div className="flex flex-col text-center min-h-max md:flex-row justify-center items-baseline gap-4">
            <div className="flex flex-col flex-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide text-primary lucide-user-round-plus"><path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="M19 16v6"/><path d="M22 19h-6"/></svg>
              <p className="mt-4 font-semibold">1. Sign Up/Login</p>
            </div>
            <div className="flex flex-col flex-1 items-center">
              <SearchCheck className='text-primary' size={64} />
              <p className="mt-4 font-semibold">2. Select an Available Space</p>
            </div>
            <div  className="flex flex-col flex-1 items-center">
              <Clock1 className='text-primary' size={64} />
              <p className="mt-4 font-semibold">3. Select Time</p>
            </div>
            <div className="flex flex-col flex-1 items-center">
              <ParkingSquare className='text-primary' size={64} />
              <p className="mt-4 font-semibold">4. Park</p>
            </div>
          </div>

          {/* <div className="mt-8 flex ">
            <button
              className="bg-foreground text-secondary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              View Parking Spaces
            </button>
          </div> */}
        </div>
        <div className="mt-12 flex-1">
          <ParkingAvailabilty />
          <KeyFeatures />
        </div>
      </div>
      <ParkingMap />
      <div data-aos="fade-up">{/* <ServicesSection /> */}</div>
    </div>
  )
}

export default Home
