import React, { useEffect, useState } from 'react'
import { getUserDestails } from '../services/PersonService';
import {Container} from "react-bootstrap";

function PersonDetails() {

    const [person, setPerson] = useState(null);

    const getPersonDetails = async ()=>{
        try {
            const details = await getUserDestails();
            setPerson(details);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{getPersonDetails()}, []);
  return (
    <>
        <h1>Details</h1>
        {person && (
            <>
            <h3>First name: {person.firstName}</h3>
            <h3>Last name: {person.lasttName}</h3>
            </>
        )}
    </>
  )
}

export default PersonDetails