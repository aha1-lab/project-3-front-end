import {useContext,useEffect} from 'react'
import { authContext } from '../context/AuthContext'
import axios from 'axios'
import { Link } from 'react-router'

function Homepage() {
  // useContext(): allows me to consume the context

  const {user} = useContext(authContext)

  // sending request to protected route that needs a token
  async function callProtectedRoute(){
    const token = localStorage.getItem("token")
    const response= await axios.get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/test-jwt/checkout`,{headers:{Authorization:`Bearer ${token}`}})
    console.log(response.data)
  }

  callProtectedRoute()
  return (
    <div>
      Homepage
      <button>
        <Link to={`persons/${user._id}`}>User Details</Link>
      </button>
      <button>
        <Link to={`persons/edit/${user._id}`}>Edit User Details</Link>
      </button>
    </div>
  )
}

export default Homepage
