import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { getPersonCart } from "../services/CartService";


const computeTotalItems = (itemsInCart)=>{
  let totalPrice = itemsInCart.reduce((total, item)=>{
    return total + item.quantity;
  }, 0);
  return totalPrice;
}
function CartIcon() {

    const [itemInCart, setItemInCart] = useState(0);

    const checkItemInCart = async ()=>{
        try {
            const response = await getPersonCart();
            setItemInCart(computeTotalItems(response.cart))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{checkItemInCart()}, []);
  return (
    <>
        <Button
          style={{ width: "3rem", height: "3rem", position: "relative" }}
          variant="outline-primary"
        >
          <i className="bi bi-cart" data-size="large"></i>
          <div
            className="rounded-circle bg-danger d-flex justify-content-center 
                align-item-center"
            style={{
              color: "white",
              width: "1.5rem",
              height: "1.5rem",
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translate(25%, 25%)",
            }}
          >
            {itemInCart}
          </div>
        </Button>
    </>
  );
};

export default CartIcon;