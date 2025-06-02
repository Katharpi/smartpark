import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Dialog = ({ isOpen }) => {
  if (!isOpen) return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate()

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
        <h2 className="text-3xl font-bold text-center  mb-6">Welcome Admin!</h2>
        <p className="text-lg  mb-4 text-center">
          Manage your parking operations efficiently. Choose an option below to
          get started.
        </p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => navigate('/admin-entry')}
            className="w-full mr-2 p-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition-colors duration-300 ease-out"
          >
            Vehicle Entry
          </button>
          <button
            onClick={() => navigate('/admin-exit')}
            className="w-full ml-2 p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors duration-300 ease-out"
          >
            Vehicle Exit
          </button>
        </div>
        <p className="text-center mt-4">
          <Link to="/" className="underline font-semibold">
            Home
          </Link>
        </p>
      </div>
    </div>
  )
}

const AdminHome = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    setIsDialogOpen(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  )
}

export default AdminHome
