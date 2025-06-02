import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '@/utils/authFunctions';
import { apiUrl } from '@/services/apiService';
import { Car, CheckCircle, TimerIcon, User, XCircle } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        
        const response = await axios.get(`${apiUrl}/api/parking/book`, {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`
          }
        });
        setBookings(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="container min-h-screen mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Bookings</h1>
        {bookings.length === 0 && <div className="text-center mt-20">No bookings found</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
          <h2 className="text-xl font-semibold mb-2 flex items-center space-x-2">
            <Car className="w-6 h-6" />
            <span>{booking.space_name}</span>
          </h2>
          <div className="flex items-center space-x-2 mb-2">
            {booking.is_occupied ? (
              <CheckCircle className="text-green-500 w-5 h-5" />
            ) : (
              <XCircle className="text-red-500 w-5 h-5" />
            )}
            <span>Occupied: {booking.is_occupied ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <User className="w-5 h-5" />
            <span>Vehicle Number: {booking.vehicle_number || 'N/A'}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <TimerIcon className="w-5 h-5" />
            <span>Reserved Time: {booking.reserved_time || 'N/A'}</span>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
