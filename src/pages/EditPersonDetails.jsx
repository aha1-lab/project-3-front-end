import {useContext,useEffect,useState} from 'react'
import { authContext } from '../context/AuthContext'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router'
import { Link } from 'react-router'

function EditPersonDetails() {

   const {user} = useContext(authContext)

    const [data, setData] = useState({user})



    const [error, setError] = useState(null)


    const navigate = useNavigate()

    const {userId} = useParams()
    console.log(userId)

    function handleChange(e){
        setData({...data,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            await axios.put(`${import.meta.env.VITE_BACK_END_SERVER_URL}/persons/edit/${userId}`,data)
            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }

        

  return (
    <>
    <h2>Edit user</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
         type="text"
         name='firstName'
         id='firstName'
         value={data.firstName}
         onChange={handleChange}
          />

       <label htmlFor="lastName">Last Name:</label>
        <input
         type="text"
         name='lastName'
         id='lastName'
         value={data.lastName}
         onChange={handleChange}
          />

       <label htmlFor="email">Email:</label>
        <input
         type="email"
         name='email'
         id='email'
         value={data.email}
         onChange={handleChange}
          />

      <label htmlFor="mode">Mode:</label>
      <select
         name="mode" id="mode"
         value={data.mode}
         onChange={handleChange}
         >
            <option value="buyer">Buyer</option>

            <option value="seller">Seller</option>
         </select>

        <label htmlFor="password">Password:</label>
        <input
         type="password"
         name='password'
         id='password'
         value={data.password}
         onChange={handleChange}
          />

          <button>Submit</button>
        </form>
    </>
  )
}

export default EditPersonDetails
