import React from "react";
import { Link } from "react-router";
import {Card} from 'react-bootstrap';


function AddressItem({ address }) {

  return (
    <Link to={`/person/address/${address._id}`}>
    <Card>
      <Card.Body className="d-flex flex-column">
        <Card.Text>
            <li>Home: {address.home}</li>
            <li>Road: {address.road}</li>
            <li>Block: {address.block}</li>
            <li>Country: {address.country}</li>
            <li>Mobile Phone: {address.mobilePhone}</li>
        </Card.Text>
      </Card.Body>
    </Card>
    </Link>
    
  );
}

export default AddressItem;
