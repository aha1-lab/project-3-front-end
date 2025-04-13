import {useContext,useEffect,useState} from 'react'
import { authContext } from '../context/AuthContext'
import axios from 'axios'
import { Link } from 'react-router'


function PersonDetails() {

    const [data, setData] = useState(null)

    const {user} = useContext(authContext);

    const [error, setError] = useState(null)



    useEffect(() => {
        const fetchData = async () => {
            console.log(user._id)
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/persons/${user._id}`);
                console.log("Data",response.data)
                setData(response.data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchData();
    }, []);



    if (error) return <div>Error: {error}</div>

return (
  <>

  {
    data && (
        <div>
            <h2>Hello {data.username}</h2>
            <ul>
                <li>
                First Name: {data.firstName}
                </li>
                <li>
                Last Name: {data.lastName}
                </li>
                <li>
                Email: {data.email}
                </li>
                <li>
                Mode: {data.mode}
                </li>
            </ul>
         
        </div>
    )
  }

  </>
)
}

export default PersonDetails