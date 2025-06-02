import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { apiUrl } from '@/services/apiService'
import socket from '@/socket'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ParkingStatisticsAdmin = () => {
  
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
      <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-4">
        <Card className="flex flex-col justify-center">
          <CardHeader>
            <div className="flex justify-center">
              <CardTitle className="text-2xl font-bold">
                Total Parking Space
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-6xl text-center mb-8 text-primary font-bold">
              {stats.total_spaces}
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-center">
          <CardHeader>
            <div className="flex justify-center">
              <CardTitle className="text-2xl font-bold">
                Occupied Parking Space
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-6xl text-center mb-8 text-primary font-bold">
              {stats.occupied_spaces}
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-center">
          <CardHeader>
            <div className="flex justify-center">
              <CardTitle className="text-2xl font-bold">
                Reserved Parking Space
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-6xl text-center mb-8 text-primary font-bold">
              {stats.reserved_spaces}
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-center">
          <CardHeader>
            <div className="flex justify-center">
              <CardTitle className="text-2xl font-bold">
                Available Parking Space
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-6xl text-center mb-8 text-primary font-bold">
              {stats.vacant_spaces}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  )
}

export default ParkingStatisticsAdmin
