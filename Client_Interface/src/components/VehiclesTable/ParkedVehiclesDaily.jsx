import { apiUrl } from '@/services/apiService'
import socket from '@/socket'
import axios from 'axios'
import { useEffect, useState } from 'react'

function ParkedVehiclesDaily() {
  const [parkedVehicles, setParkedVehicles] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date())

  const getDateString = () => {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  useEffect(() => {
    const fetchParkedVehicles = async () => {
      const response = await axios.get(
        `${apiUrl}/api/parking/transactions/day/${getDateString()}`
      )
      const sortedData = response.data.sort((a, b) => { 
        return new Date(b.entry_time) - new Date(a.entry_time)
      })
      setParkedVehicles(sortedData)
    }
    fetchParkedVehicles()

    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    socket.on('parking_transaction_created', () => {
      fetchParkedVehicles()
    })

    socket.on('parking_space_updated', () => {
      fetchParkedVehicles()
    })

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  const calculateDuration = (start, end) => {
    const diff = end - start
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)) * 24
    const hours =
      Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return `${hours}h ${minutes}m ${seconds}s`
  }

  return (
    <div className=" bg-card  shadow-lg rounded-sm border ">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Vehicles Parked Today
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th>
                  <div className="font-semibold text-left">Sl. No. </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Vehicle Number </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Space Alloted </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Entry Time</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Exit Time</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Duration</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Parking Fee</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">
                    Payment Status
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {parkedVehicles.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan="6" className="p-4 text-center">
                    No vehicles parked today
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                {parkedVehicles.map((vehicle, index) => {
                  return (
                    <tr key={vehicle.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-slate-800 dark:text-slate-100">
                            {index + 1}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-slate-800 dark:text-slate-100">
                            {vehicle.vehicle_number}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-slate-800 dark:text-slate-100">
                            {vehicle.parking_space.space_name}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">
                          {new Date(vehicle.entry_time).toLocaleString()}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">
                          {vehicle.exit_time
                            ? new Date(vehicle.exit_time).toLocaleString()
                            : '-'}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">
                          {vehicle.exit_time
                            ? calculateDuration(
                                new Date(vehicle.entry_time),
                                new Date(vehicle.exit_time)
                              )
                            : calculateDuration(
                                new Date(vehicle.entry_time),
                                currentTime
                              )}
                        </div>
                      </td>

                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">
                          {vehicle.amount ? '₹'+ vehicle.amount : '-'}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">
                          {vehicle.status}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  )
}

export default ParkedVehiclesDaily
