import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { apiUrl } from '@/services/apiService'
import { getAuthToken } from '@/utils/authFunctions'

const BookingForm = ({id}) => {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    vehicleNumber: '',
    hour: '',
    minute: '',
  })

  const [formErrors, setFormErrors] = useState({
    vehicleNumber: '',
    hour: '',
    minute: '',
  })

  const validateForm = (now, selectedTime) => {
    let errors = {}

    if (!formData.vehicleNumber) {
      errors.vehicleNumber = 'Username is required'
    }

    if (!formData.hour) {
      errors.hour = 'Hour is required'
    }

    if (!formData.minute) {
      errors.minute = 'Minute is required'
    }

    if (selectedTime < now) {
      errors.hour = 'Selected time is in the past. Please choose a valid time.'
    }

    if (formData.hour < 0 || formData.hour > 23) {
      errors.hour = 'Hour must be between 0 and 23'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const now = new Date()
    const selectedTime = new Date()
    selectedTime.setHours(formData.hour)
    selectedTime.setMinutes(formData.minute)

    if (!validateForm(now, selectedTime)) {
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`${apiUrl}/api/parking/book`,{
        space_id: id,
        vehicle_number: formData.vehicleNumber,
        entry_time: selectedTime.toISOString(),
      }, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
      })

      console.log(response)

      const escKeyEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        keyCode: 27,
      })
      document.dispatchEvent(escKeyEvent)
      // console.log(state)
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Login failed', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
    setFormErrors((prev) => ({ ...prev, [id]: '' }))
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-2 py-6">
          <div className="space-y-1">
            <Label htmlFor="vehicleNumber">Vehicle Number</Label>
            <Input
              id="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              ref={inputRef}
            />
            {formErrors.vehicleNumber && (
              <p className="text-red-500 font-semibold text-sm">
                {formErrors.vehicleNumber}
              </p>
            )}
          </div>
          <div className="pt-4">
            <Label>Entry Time</Label>
          </div>
          <div className="space-y-1 flex gap-2 justify-between items-center">
            <div className="flex-1">
              <Label htmlFor="hour">Hour</Label>
              <Input
                type="number"
                id="hour"
                name="hour"
                value={formData.hour}
                onChange={handleChange}
                min="0"
                max="23"
                required
              />
            </div>

            <div className="flex-1">
              <Label htmlFor="hour">Minute</Label>
              <Input
                type="number"
                name="minute"
                id="minute"
                value={formData.minute}
                onChange={handleChange}
                min="0"
                max="59"
                required
              />
            </div>
          </div>
          {formErrors.hour && (
            <p className="text-red-500 font-semibold text-sm">
              {formErrors.hour}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                {' '}
                <Loader2 className="animate-spin mr-2" />{' '}
                <span>Please Wait</span>
              </>
            ) : (
              'Book'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default BookingForm
