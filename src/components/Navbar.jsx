import { Link } from "react-router"
import { useContext } from "react"
import { authContext } from "../context/AuthContext"

function Navbar() {
  const {user, logout} = useContext(authContext)


  return (
    <div>
      <ul>
        <button>
        <Link to="/">Homepage</Link>
        </button>
        {user && (

          <>
          {/* <li>Welcome {user.username}</li> */}
          <h2>Welcome {user.username}</h2>
          <button onClick={logout}>Logout</button>
          <button>
          <Link to={`persons/${user._id}`}>User Details</Link>
          </button>
          <button>
          <Link to={`persons/edit/${user._id}`}>Edit User Details</Link>
          </button>
          </>
        )}
        {!user && (
          <>
          <Link to='/login'><li>Login</li></Link>
          <Link to='/signup'><li>Signup</li></Link>
          </>
        )}
        

      </ul>
    </div>
  )
}

export default Navbar
