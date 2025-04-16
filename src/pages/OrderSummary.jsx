import React from "react";
import { useState, useEffect } from "react";
import {
  getPersonCart,
  removeFormCart,
  updateProductToCart,
} from "../services/CartService";
import { Stack, Button, Dropdown } from "react-bootstrap";
import CartItem from "../components/CartItem";
import { changeNumberToThreeDicemel } from "../helper/fixedDicemel";
import { getIndex } from "../services/AddressService";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { getOrdersDetails, getOrderProduct } from "../services/OrderService";
import { useParams } from "react-router";

const computeTotalPrice = (itemsInCart) => {
  let totalPrice = itemsInCart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
  return totalPrice;
};

function OrderSummary() {

  const {orderId} = useParams();
  const { user } = useContext(authContext);

  const [itemsInCart, setItemsInCart] = useState(null);
  const [orderDetails, setOderDetails] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);


  const getOrderAndItems = async () => {
    try {
      const responseOrderDetails = await getOrdersDetails(orderId);
      // console.log(responseOrderDetails);
      setOderDetails(responseOrderDetails);
      // console.log(orderDetails);
      const responseItemList = await getOrderProduct(orderId);
      // console.log(responseItemList)
      setItemsInCart(responseItemList);
      setTotalPrice(computeTotalPrice(responseItemList));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderAndItems();
  }, []);


  return (
    <>
      <h1>Cart</h1>
      <Stack gap={3}>
        {itemsInCart ? (
          itemsInCart.map((item) => (
            <CartItem
              key={item._id}
              item={item}
            />
          ))
        ) : (
          <h1>Cart Empty</h1>
        )}
        <div className="ms-auto fw-bold fs-5">
          {totalPrice === 0 ? (
            ""
          ) : (
            <>Total : BHD {changeNumberToThreeDicemel(totalPrice)}</>
          )}
        </div>
      </Stack>

      <Stack
        direction="horizontal"
        gap={3}
        className="d-flex align-items-center shadow-lg"
      >
        <p>Shipping Address</p>
        <div className="d-grid gap-2">
          <p>
            Home:{orderDetails.shippingAddres.home}, Road: {orderDetails.shippingAddres.road}, Block: {orderDetails.shippingAddres.block}
          </p>
        </div>
      </Stack>
    </>
  );
}

export default OrderSummary;
