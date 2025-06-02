import car from '@/assets/car.png'
import { Badge } from '@/components/ui/badge'
import { Card } from '../ui/card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiUrl } from '@/services/apiService'
import socket from '@/socket'
import { useAuth } from '@/context/UserAuthContext'
import { BookingDialog } from '../BookingDialog/BookingDialog'

const Road = () => {
  return (
    <div className="relative w-full h-56">
      {/* Road Base */}
      <div className="absolute w-full h-full left-0 right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 dark:bg-gray-900"></div>
      {/* Road Markings */}
      <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between items-center text-white">
        <div className="w-16 h-2 bg-yellow-300 "></div>
        <div className="w-16 h-2 bg-yellow-300 "></div>
        <div className="w-16 h-2 bg-yellow-300 "></div>
        <div className="w-16 h-2 bg-yellow-300 "></div>
        <div className="w-16 h-2 bg-yellow-300 "></div>
        <div className="w-16 h-2 bg-yellow-300 "></div>
        <div className="w-16 h-2 bg-yellow-300 "></div>
        <div className="w-16 h-2 bg-yellow-300 "></div>
        <div className="w-16 h-2 bg-yellow-300 "></div>
      </div>
    </div>
  )
}

const ParkingMap = () => {
  const [parkingSpace, setParkingSpace] = useState([])

  const { state } = useAuth()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/parking`)
        setParkingSpace(data.sort((a, b) => a.id - b.id))
      } catch (error) {
        console.log(error)
      }
    }

    fetchStats()

    socket.on('parking_space_updated', (updatedSlot) => {
      console.log(updatedSlot)
      setParkingSpace((prevParkingSpace) =>
        prevParkingSpace.map((slot) =>
          slot.id === updatedSlot.id ? { ...slot, ...updatedSlot } : slot
        )
      )
    })
  }, [])

  return (
    <Card className="">
      <header className="px-5 py-1 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-xl flex items-center gap-2 p-2 text-slate-800 dark:text-slate-100">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
          </span>
          <span>Live Parking Map </span>
        </h2>
      </header>
      <div className="flex flex-col items-center  p-8">
        {parkingSpace.length && (
          <div className="shadow-lg bg-gray-800 dark:bg-gray-900 w-full rounded-sm flex flex-col ">
            <div
              className={`border-t-4 border-x-4 rounded-sm dark:border-gray-600 border-gray-400 flex justify-evenly`}
            >
              {parkingSpace.slice(0, 8).map((slot) => (
                <div
                  key={slot.id}
                  className="h-64 flex-1 border-x-2 flex flex-col items-center justify-center dark:border-gray-600 border-gray-400"
                >
                  {state &&
                    state.user &&
                    state.user.user_type === 'user' &&
                    !slot.is_occupied &&
                    !slot.is_reserved && (
                     <BookingDialog space_name={slot.space_name} id={slot.id} />
                    )}
                  {slot.is_occupied ? (
                    <>
                      <Badge className="bg-red-500">Occupied</Badge>
                      <img src={car} alt="car" className="w-32 h-32 mt-2" />
                    </>
                  ) : slot.is_reserved ? (
                    <>
                      <Badge className="bg-yellow-500">Reserved</Badge>
                      <img src={car} alt="car" className="w-32 h-32 mt-2" />
                    </>
                  ) : (
                    <>
                      <Badge className="bg-green-500 hover:bg-green-600">
                        Available
                      </Badge>
                    </>
                  )}
                  {state && state.user && state.user.user_type === 'admin' && (
                    <div className="mt-2 font-bold">{slot.vehicle_number}</div>
                  )}
                  <div className="mt-4 text-gray-100 text-xl dark:text-gray-300">
                    {slot.space_name}
                  </div>
                  
                </div>
              ))}
            </div>
            <Road />
            <div
              className={`border-b-4 border-x-4 rounded-sm dark:border-gray-600 border-gray-400 flex justify-evenly`}
            >
              {parkingSpace.slice(8, 16).map((slot) => (
                <div
                  key={slot.id}
                  className="h-64 flex-1 border-x-2 flex flex-col items-center justify-center dark:border-gray-600 border-gray-400"
                >
                  <div className="mb-4 text-xl text-gray-100 dark:text-gray-300">
                    {slot.space_name}
                  </div>
                  {state && state.user && state.user.user_type === 'admin' && (
                    <div className="mb-2 font-bold">{slot.vehicle_number}</div>
                  )}

                  {slot.is_occupied ? (
                    <>
                      <img
                        src={car}
                        alt="car"
                        className="w-32 h-32 mb-2 rotate-180"
                      />
                      <Badge className="bg-red-500">Occupied</Badge>
                    </>
                  ) : slot.is_reserved ? (
                    <>
                      <img
                        src={car}
                        alt="car"
                        className="w-32 h-32 mb-2 rotate-180"
                      />
                      <Badge className="bg-yellow-500">Reserved</Badge>
                    </>
                  ) : (
                    <>
                      <Badge className="bg-green-500 hover:bg-green-600">
                        Available
                      </Badge>
                    </>
                  )}
                  {state &&
                    state.user &&
                    state.user.user_type === 'user' &&
                    !slot.is_occupied &&
                    !slot.is_reserved && (
                      <BookingDialog space_name={slot.space_name} id={slot.id} />
                    )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

export default ParkingMap
