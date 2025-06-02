// AuthContext.js
// import { userApiService } from '@/services/apiService'
// import { getAuthToken } from '@/utils/authFunctions'
import { createContext, useReducer, useContext, } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const initialState = {
    isLoggedIn: false,
    user: null,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        // Save user information to local storage
        localStorage.setItem('user', JSON.stringify(action.payload))
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,
        }
      case 'LOGOUT':
        // Clear user information from local storage
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        }
      case 'UPDATE':
        // Update user information in local storage
        localStorage.setItem('user', JSON.stringify(action.payload))
        return {
          ...state,
          user: action.payload,
        }
      default:
        return state
    }
  }

  // Check local storage for saved user information
  const storedUser = JSON.parse(localStorage.getItem('user'))

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...(storedUser && { isLoggedIn: true, user: storedUser }),
  })

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const storedToken = getAuthToken()

  //       if (storedToken) {
  //         const userProfile = await userApiService.getMyProfile(storedToken)

  //         dispatch({ type: 'LOGIN', payload: { ...userProfile } })
  //       }
  //     } catch (error) {
  //       if (error.toString().includes('Unauthorized')) {
  //         dispatch({ type: 'LOGOUT' })
  //       }

  //       console.error('Error fetching user profile:', error)
  //     }
  //   }

  //   fetchUserProfile()
  // }, [])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
