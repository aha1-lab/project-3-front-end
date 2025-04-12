import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function Signup() {

    const [formData, setFormData] = useState({
        username:"",
        firstName:"",
        lastName:"",
        email:"",
        mode:"",
        password:"",
    })

    const navigate = useNavigate()
    

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            await axios.post(`${import.meta.env.VITE_BACK_END_SERVER_URL}/auth/sign-up`,formData)
            navigate("/login")
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
         type="text"
         name='username'
         id='username'
         value={formData.username}
         onChange={handleChange}
          />

        <label htmlFor="firstName">First Name:</label>
        <input
         type="text"
         name='firstName'
         id='firstName'
         value={formData.firstName}
         onChange={handleChange}
          />

       <label htmlFor="lastName">Last Name:</label>
        <input
         type="text"
         name='lastName'
         id='lastName'
         value={formData.lastName}
         onChange={handleChange}
          />

       <label htmlFor="email">Email:</label>
        <input
         type="email"
         name='email'
         id='email'
         value={formData.email}
         onChange={handleChange}
          />

      <label htmlFor="mode">Mode:</label>
      <select
         name="mode" id="mode"
         value={formData.mode}
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
         value={formData.password}
         onChange={handleChange}
          />

          <button>Submit</button>
      </form>
    </div>
  )
}

export default Signup
