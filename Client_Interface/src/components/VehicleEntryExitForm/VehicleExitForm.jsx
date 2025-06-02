import { useState, useEffect } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import socket from '@/socket'
import axios from 'axios'
import { apiUrl } from '@/services/apiService'
import {
  BadgeCheck,
  Car,
  Clock,
  Hourglass,
  IndianRupee,
  ParkingSquare,
  X,
} from 'lucide-react'
import useCustomToasts from '@/hooks/useCustomToasts'

const Dialog = ({ isOpen, onClose, title, data, setOcrData }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isPaid, setIsPaid] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  if (!isOpen) return null

  const calculateDuration = (start, end) => {
    const diff = end - start
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)) * 24
    const hours =
      Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return { hours, minutes, seconds, totalSeconds: diff / 1000 }
  }

  const calculateFee = (duration) => {
    const hourlyRate = 100 // Hourly rate in rupees
    const perSecondRate = hourlyRate / 3600 // Convert hourly rate to per second rate
    return (perSecondRate * duration.totalSeconds).toFixed(2)
  }

  const entryTime = new Date(data?.transaction?.entry_time)
  const exitTime = data?.transaction?.exit_time
    ? new Date(data.transaction.exit_time)
    : currentTime
  const duration = calculateDuration(entryTime, exitTime)
  const durationString = `${duration.hours}h ${duration.minutes}m ${duration.seconds}s`
  const fee = calculateFee(duration)

  const exitVehicle = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/parking/exit`, {
        vehicle_number: data.parking_space.vehicle_number,
        fee: Math.floor(fee),
        exit_time: exitTime.toISOString(),
      })
      setIsPaid(true)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ease-out ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-background p-6 shadow-lg duration-300 ease-out transform transition-all sm:rounded-lg ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors duration-300 ease-out"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl mb-4 dark:text-foreground">{title}</h2>
        {isPaid && (
          <div className="mt-4 p-4 flex items-center gap-2 bg-green-100 text-green-800 rounded-lg shadow-sm">
            <BadgeCheck size={40} className="text-xl text-green-500" />
            <div className="font-semibold text-lg">
              Vehicle exit successful, and cleared from parking space.
            </div>
          </div>
        )}
        {(data && !isPaid ) && (
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-muted rounded-lg shadow-sm">
              <ParkingSquare className="text-xl text-primary mr-3" />
              <div className="font-semibold text-lg">
                <strong>Space Name:</strong> {data.parking_space.space_name}
              </div>
            </div>
            <div className="flex items-center p-4 bg-muted rounded-lg shadow-sm">
              <Car className="text-xl text-primary mr-3" />
              <div className="font-semibold text-lg">
                <strong>Vehicle Number:</strong>{' '}
                {data.parking_space.vehicle_number}
              </div>
            </div>
            <div className="flex items-center p-4 bg-muted rounded-lg shadow-sm">
              <Clock className="text-xl text-primary mr-3" />
              <div className="font-semibold text-lg">
                <strong>Entry Time:</strong> {entryTime.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center p-4 bg-muted rounded-lg shadow-sm">
              <Clock className="text-xl text-primary mr-3" />
              <div className="font-semibold text-lg">
                <strong>Exit Time:</strong> {exitTime.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center p-4 bg-muted rounded-lg shadow-sm">
              <Hourglass className="text-xl text-primary mr-3" />
              <div className="font-semibold text-lg">
                <strong>Duration:</strong> {durationString}
              </div>
            </div>
            <div className="flex items-center p-4 bg-muted rounded-lg shadow-sm">
              <IndianRupee className="text-xl text-primary mr-3" />
              <div className="font-semibold text-lg">
                <strong>Fee:</strong> ₹{fee}
              </div>
            </div>
          </div>
        )}
        {/* Button to delete and Amount Paid */}
        <div className="mt-4 text-right">
          {/* <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-opacity-90 transition-opacity duration-300 ease-out"
          >
            Delete
          </button> */}
          {!isPaid ? (
            <Button
              onClick={exitVehicle}
              className="px-4 py-2 ml-4 bg-green-500 text-primary-foreground rounded hover:bg-opacity-90 transition-opacity duration-300 ease-out"
            >
              Received ₹{Math.floor(fee)}
            </Button>
          ) : (
            <button
              onClick={() => {
                onClose()
                setOcrData('')
                setIsPaid(false)
              }}
              className="px-4 py-2 ml-4 bg-primary text-primary-foreground rounded hover:bg-opacity-90 transition-opacity duration-300 ease-out"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function VehicleExitForm() {
  // const socketRef = useRef(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [ocrData, setOcrData] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState('')

  const { showErrorToast } = useCustomToasts()

  useEffect(() => {
    socket.on('exit_frame', (imageData) => {
      // Assuming imageData is a Base64-encoded string
      setCroppedImage(`data:image/jpeg;base64,${imageData}`)
    })

    socket.on('exit_ocr', (ocrData) => {
      // Assuming ocrData is a string
      setOcrData(ocrData)
    })
  }, [])

  const handleSearchVehicle = async () => {

    if (!ocrData) {
      showErrorToast('Error', 'Please ensure vehicle number plate is detected/entered.')
      return
    }


    try {
      const response = await axios.get(
        `${apiUrl}/api/parking/search?vehicle_number=${ocrData}`
      )

      setIsDialogOpen(true)
      setDialogContent(response.data)
    } catch (error) {
      showErrorToast('Error', error.response.data.message)
      console.log(error)
    }
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
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
          onClick={handleSearchVehicle}
          className="bg-primary  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search Vehicle
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
        <Dialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          title="Parking Allocation Details"
          data={dialogContent}
          setOcrData={setOcrData}
        >
          {'Loading...'}
        </Dialog>
      </div>
    </Card>
  )
}

export default VehicleExitForm
