import React, { useEffect, useState } from "react";
import { getAddressDestails } from "../services/AddressService";
import { useParams, Link } from "react-router";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";


function AddressDetails() {
  const { user } = useContext(authContext);
  const [addressDetails, setAddressDetails] = useState(null);

  const getDetails = async () => {
    const response = await getAddressDestails();
    setAddressDetails(response);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      {addressDetails && (
        <>
          <h1>{user.firstname} Address</h1>
          <ul>
            <li>Home: {addressDetails.home}</li>
            <li>Road: {addressDetails.road}</li>
            <li>Block: {addressDetails.block}</li>
            <li>Country: {addressDetails.country}</li>
            <li>Mobile Phone: {addressDetails.mobilePhone}</li>
          </ul>
        </>
      )}
    </>
  );
}

export default AddressDetails;
