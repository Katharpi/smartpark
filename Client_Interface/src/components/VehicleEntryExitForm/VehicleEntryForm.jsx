import { useState, useEffect } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import socket from '@/socket'
import axios from 'axios'
import { apiUrl } from '@/services/apiService'
import { Car, Clock, ParkingSquare, X } from 'lucide-react'
import useCustomToasts from '@/hooks/useCustomToasts'


const Dialog = ({ isOpen, onClose, title, data }) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-background p-6 shadow-lg duration-300 ease-out transform transition-all sm:rounded-lg ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors duration-300 ease-out">
          <X size={24} />
        </button>
        <h2 className="text-2xl mb-4 dark:text-foreground">{title}</h2>
        {data ? (
          <div className="space-y-4">
            {data.parking_space.is_reserved && (
          <div className="flex items-center p-4 bg-muted rounded-lg shadow-sm">
            
            <div className="font-semibold text-lg">
              <strong>Reserved By:</strong> {data.parking_space.reserved_by_user.name}
            </div>
          </div>)}
          <div className="flex items-center p-4 bg-muted rounded-lg shadow-sm">
            <ParkingSquare className="text-xl text-primary mr-3" />
            <div className="font-semibold text-lg">
              <strong>Space Name:</strong> {data.parking_space.space_name}
            </div>
          </div>
          <div className="flex items-center p-4 bg-muted rounded-lg shadow-sm">
            <Car className="text-xl text-primary mr-3" />
            <div className="font-semibold text-lg">
              <strong>Vehicle Number:</strong> {data.parking_space.vehicle_number}
            </div>
          </div>
          <div className="flex items-center p-4 bg-muted rounded-lg shadow-sm">
            <Clock className="text-xl text-primary mr-3" />
            <div className="font-semibold text-lg">
              <strong>Entry Time:</strong> {new Date(data.transaction.entry_time).toLocaleString()}
            </div>
          </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-opacity-90 transition-opacity duration-300 ease-out">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};



function VehicleEntryForm() {
  // const socketRef = useRef(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [ocrData, setOcrData] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState('')

  const {showErrorToast, showSuccessToast} = useCustomToasts()

  useEffect(() => {
    socket.on('frame', (imageData) => {
      // Assuming imageData is a Base64-encoded string
      setCroppedImage(`data:image/jpeg;base64,${imageData}`)
    })

    socket.on('ocr', (ocrData) => {
      // Assuming ocrData is a string
      setOcrData(ocrData)
    })
  }, [])

  const handleSaveVehicle = async () => {

    if (!ocrData) {
      showErrorToast('Error', 'Ensure vehicle number plate is recognised/entered')
      return
    }

    try {
      const response = await axios.post(`${apiUrl}/api/parking/entry`, {
        vehicle_number: ocrData,
      })

      setOcrData('')
      setIsDialogOpen(true)
      setDialogContent(response.data)
      setCroppedImage(null)

      showSuccessToast('Success', 'Vehicle information saved successfully')

      console.log(response.data)
    } catch (error) {
      showErrorToast('Error', 'Failed to save vehicle information')
      console.log(error)
    }
  }

  return (
    <Card className="flex flex-col col-span-full sm:col-span-1 ">
      <header className="px-5 py-1 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Detected Number Plate
        </h2>
      </header>

      {/* Show detected license plate image of vehicle */}
      {croppedImage ? (
        <div className="p-4 mx-auto">
          <img
            className="h-20"
            src={croppedImage}
            alt="Detected license plate"
          />
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-center justify-center h-20 bg-gray-200 dark:bg-gray-800 rounded-md">
            <span className="text-gray-400 dark:text-gray-600">
              Detected license plate goes here
            </span>
          </div>
        </div>
      )}

      {/* Show recognised characters in input field */}
      <header className="px-5 py-1 border-y border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Recognised Characters
        </h2>
      </header>
      {/* Input field with recognised characters */}
      <div className="p-4">
        <Input
          className="h-16 p-2 font-extrabold text-xl"
          value={ocrData}
          onChange={(e) => setOcrData(e.target.value)}
          placeholder="Enter Vehicle Number Plate"
        />
      </div>
      {/* Button to save and clear vehicle information  */}
      <div className="flex flex-col justify-center gap-4 p-4 w-full">
        <Button
          onClick={handleSaveVehicle}
          className="bg-primary  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Vehicle
        </Button>

        <Button
          onClick={() => {
            setCroppedImage(null)
            setOcrData('')
          }}
          className="bg-foreground hover:bg- dark:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Clear Data
        </Button>

        <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Parking Allocation Information" data={dialogContent} />
      </div>
    </Card>
  )
}

export default VehicleEntryForm
