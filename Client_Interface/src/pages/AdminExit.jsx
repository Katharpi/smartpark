// Page for web cam for vehicle entry

import CameraComponentExit from '@/components/CameraComponent/CameraComponentExit'
import ParkingMap from '@/components/ParkingLiveMap/ParnkingMap'
import ParkingStatisticsAdmin from '@/components/ParkingStatistics/ParkingStatisticsAdmin'
import VehicleExitForm from '@/components/VehicleEntryExitForm/VehicleExitForm'
import ParkedVehiclesDaily from '@/components/VehiclesTable/ParkedVehiclesDaily'

const AdminExit = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <div className="px-4 sm:px-6 lg:px-8 pt-4 pb-8 w-full max-w-9xl mx-auto">
            <div className="grid grid-cols-4 gap-6">
              <CameraComponentExit />
              <VehicleExitForm />
              <ParkingStatisticsAdmin />
            </div>
          </div>
        </main>
      </div>
      <div className="px-8 mt-16">
        <ParkingMap />
      </div>
      <div className="px-8 my-16">
        <ParkedVehiclesDaily />
      </div>
    </div>
  )
}

export default AdminExit
