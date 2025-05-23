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
import { createOrder, createOrderProduct } from "../services/OrderService";
import { removeAllFormCart } from "../services/CartService";
import {updateProductDetails} from '../services/ProductService';
import { useNavigate } from "react-router";


const computeTotalPrice = (itemsInCart) => {
  let totalPrice = itemsInCart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
  return totalPrice;
};

function Cart() {

  const navigator = useNavigate();
  const [dataForm, setDataForm] = useState(null);
  const { user } = useContext(authContext);
  const handleChange = (address) => {
    // console.log(address)
    let addressNew = {
      address: `Home:${address.home}, Road: ${address.road}, Block: ${address.block}`,
      addressId: address._id,
    };
    setDataForm(addressNew);
  };
  const [itemsInCart, setItemsInCart] = useState(null);
  const [addressList, setAddressList] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const checkItemInCart = async () => {
    try {
      const response = await getPersonCart();
      setItemsInCart(response.cart);
      setTotalPrice(computeTotalPrice(response.cart));
    } catch (error) {
      console.log(error);
    }
  };

  const getAddress = async () => {
    try {
      const response = await getIndex();
      setAddressList(response);
      if (response.length > 0) {
        handleChange(response[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkItemInCart();
    getAddress();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await removeFormCart(itemId);
      await checkItemInCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = async (
    addType,
    stock,
    productId,
    currentQuantity
  ) => {
    let newQuantity = 0;
    if (addType === 1) {
      if (currentQuantity < stock) {
        newQuantity = currentQuantity + 1;
      }
    } else {
      if (currentQuantity > 0) {
        newQuantity = currentQuantity - 1;
      }
    }
    try {
      const formData = { quantity: newQuantity };
      const response = await updateProductToCart(productId, formData);
      await checkItemInCart();
    } catch (error) {
      console.log(error.response.data.err);
    }
  };

  const handleCheckout = async () => {
    // console.log(dataForm);
    // console.log(itemsInCart);
    try {
      const orderForm = {
        buyer: user._id,
        shippingAddres: dataForm.addressId,
        orderPrice: changeNumberToThreeDicemel(totalPrice),
      };

      const orderResponse = await createOrder(orderForm);

      itemsInCart.map(async (item) => {
        const orderProductForm = {
          order: orderResponse._id,
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        };
        await createOrderProduct(orderProductForm);
        item.product.stock = item.product.stock - item.quantity;
        await updateProductDetails(item.product._id, item.product);
      });
      await removeAllFormCart();
      checkItemInCart();
      navigator(`/orders/${orderResponse._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Cart</h1>
      <Stack gap={3}>
        {itemsInCart ? (
          itemsInCart.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              handleRemoveItem={handleRemoveItem}
              handleQuantityChange={handleQuantityChange}
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
      {totalPrice > 0 ?(
        <>
          <Stack
            direction="horizontal"
            gap={3}
            className="d-flex align-items-center shadow-lg"
          >
            <p>Select Address</p>
            <div className="d-grid gap-2">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Address
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {addressList &&
                    addressList.map((address) => (
                      <Dropdown.Item
                        key={address._id}
                        onClick={() => handleChange(address)}
                        value={dataForm.address}
                      >
                        Home:{address.home}, Road: {address.road}, Block:{" "}
                        {address.block}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Stack>

          <div className="d-grid gap-2">
            <Button className="mt-4" size="lg" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </>
      ):(
        <h2>Cart is empty</h2>
      )}
    </>
  );
}

export default Cart;
