// import Sidebar from '@/components/Layout/AdminSidebar'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { apiUrl } from '@/services/apiService'
import socket from '@/socket'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ParkingAvailabilty = () => {
  // get the stats from the server using axios
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/parking/stats`)
        setStats(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchStats()

    socket.on('parking_stats_updated', (stats) => {
      setStats(stats)
    })
  }, [])

  return (
    stats && (
      <div className="flex flex-col justify-center md:flex-row">
        <div className="flex flex-col lg:flex-row px-16 justify-center gap-8 mx-auto w-full">
          <Card className="flex flex-1 flex-col justify-center w-64 ">
            {/* <Link to={'/admin/approval'}> */}
            <CardHeader>
              <div className="flex justify-center">
                <CardTitle className="text-2xl font-bold">
                  Total Parking Space
                </CardTitle>
                {/* <ShieldCheck size={24} className="text-[#3b82f6]" /> */}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-6xl text-center mb-8 text-primary font-bold">
                {stats.total_spaces}
              </div>
            </CardContent>
            {/* </Link> */}
          </Card>{' '}
          <Card className="flex flex-col flex-1 justify-center w-64">
            {/* <Link to={'/admin/products'}> */}
            <CardHeader>
              <div className="flex justify-center">
                <CardTitle className="text-2xl font-bold">
                  Available Parking Space
                </CardTitle>
                {/* <PackageCheck size={24} className="text-[#3b82f6]" /> */}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-6xl text-center mb-8 text-primary font-bold">
                {stats.vacant_spaces}
              </div>
            </CardContent>
            {/* </Link> */}
          </Card>{' '}
        </div>
      </div>
    )
  )
}

export default ParkingAvailabilty
