import React, { useEffect, useState } from "react";
import { getIndex } from "../services/AddressService";
import { useParams, Link } from "react-router";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import AddressItem from "../components/AddressItem";
import { Stack } from "react-bootstrap";

function AddressDetails() {
  const { user } = useContext(authContext); 
  const [addressDetails, setAddressDetails] = useState(null);

  const getDetails = async () => {
    const response = await getIndex();
    setAddressDetails(response);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <h1>Addresses</h1>
      <Stack gap={3}>
        {addressDetails &&
          addressDetails.map((address) => (
            <AddressItem key={address._id} address={address} />
          ))}
      </Stack>
    </>
  );
}

export default AddressDetails;
