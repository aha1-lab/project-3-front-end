import {useContext,useEffect,useState} from 'react'
import { authContext } from '../context/AuthContext'
import axios from 'axios'
import { Link } from 'react-router'

function EditPersonDetails() {

    const [data, setData] = useState(null)

    const {user} = useContext(authContext)


    const [error, setError] = useState(null)

    function handleChange(e){
        setData({...data,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/edit/persons/${user._id}`,data)
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
         value={user.firstName}
         onChange={handleChange}
          />

       <label htmlFor="lastName">Last Name:</label>
        <input
         type="text"
         name='lastName'
         id='lastName'
         value={user.lastName}
         onChange={handleChange}
          />

       <label htmlFor="email">Email:</label>
        <input
         type="email"
         name='email'
         id='email'
         value={user.email}
         onChange={handleChange}
          />

      <label htmlFor="mode">Mode:</label>
      <select
         name="mode" id="mode"
         value={user.mode}
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
         value={user.password}
         onChange={handleChange}
          />

          <button>Submit</button>
        </form>
    </>
  )
}

export default EditPersonDetails
