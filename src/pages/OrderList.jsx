import React, { useEffect, useState } from "react";
import { getOrders } from "../services/OrderService";
import { useParams, Link } from "react-router";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import OrderCard from "../components/OrderCard";
import { Stack } from "react-bootstrap";

function OrderList() {
  const { user } = useContext(authContext); 
  const [orderList, setOrderList] = useState(null);

  const getDetails = async () => {
    const response = await getOrders();
    setOrderList(response);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <h1>Order Summary</h1>
      <Stack gap={3}>
        {orderList &&
          orderList.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
      </Stack>
    </>
  );
}

export default OrderList;
