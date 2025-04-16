import React from "react";
import { Link } from "react-router";
import {Card} from 'react-bootstrap';


function OrderCard({ order }) {

  return (
    <Link to={`/orderDetails/${order._id}`}>
    <Card>
      <Card.Body className="d-flex flex-column">
        <Card.Text>
            <li>Order_ID: {order._id}</li>
            <li>Total price: {order.orderPrice}</li>
            <li>Order Satus: {order.orderSatus}</li>
            <li>Payment Status: {order.paymentStatus}</li>
            <li>Order Date: {order.createdAt}</li>
        </Card.Text>
      </Card.Body>
    </Card>
    </Link>
    
  );
}

export default OrderCard;
