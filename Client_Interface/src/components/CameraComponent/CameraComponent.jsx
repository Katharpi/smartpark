import { useRef, useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Card } from '../ui/card'
import { Switch } from '../ui/switch'
import { CameraOff } from 'lucide-react'
import socket from '@/socket'

const CameraComponent = () => {
  const webcamRef = useRef(null)

  const [toggleCamera, setToggleCamera] = useState(true)

  useEffect(() => {
    let captureInterval
    if (toggleCamera) {
      captureInterval = setInterval(() => {
        if (webcamRef.current) {
          const imageSrc = webcamRef.current.getScreenshot()
          socket.emit('frame', imageSrc)
        }
      }, 2000) // Capture a frame every 1 second
    }

    return () => {
      clearInterval(captureInterval)
    }
  }, [toggleCamera])

  const getVideoConstraints = () => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent)
    return {
      width: 640,
      height: 640,
      facingMode: isMobile ? { exact: 'environment' } : 'user',
    }
  }

  const videoConstraints = getVideoConstraints()

  return (
    <Card className="flex flex-col col-span-full sm:col-span-1">
      <header className="px-5 flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Live Feed
        </h2>
        <div className="flex items-center gap-2">
          <span>Camera</span>
          <Switch
            checked={toggleCamera}
            onCheckedChange={() => setToggleCamera(!toggleCamera)}
          />
        </div>
      </header>
      <div className="p-4 w-[400px] h-[400px]">
        {toggleCamera ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <div className='flex items-center justify-center h-full'>
            <CameraOff size={64} color='gray' strokeWidth={1} />
          </div>
        )}  
      </div>
    </Card>
  )
}

export default CameraComponent
