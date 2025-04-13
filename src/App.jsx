import {Routes ,Route} from 'react-router'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import PersonDetails from './pages/personDetails'
import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn'
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut'
import { Container } from "react-bootstrap";
import { useContext } from 'react'
import { authContext } from './context/AuthContext'
import EditPersonDetails from './pages/EditPersonDetails'



function App() {
  const {user} = useContext(authContext)


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        {user && (
          <>
        <Route path='/persons/:userId' element={<PersonDetails/>}/>
        <Route path='/persons/edit/:userId' element={<EditPersonDetails/>}/>
        <Route path='/' element={<Homepage/>}/>
        </>
        )}
      </Routes>
    </>
  )
}

export default App
