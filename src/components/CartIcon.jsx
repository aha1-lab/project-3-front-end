import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getPersonCart } from "../services/CartService";

const computeTotalItems = (itemsInCart) => {
  let totalPrice = itemsInCart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  return totalPrice;
};
function CartIcon() {
  const [itemInCart, setItemInCart] = useState(0);

  const checkItemInCart = async () => {
    try {
      const response = await getPersonCart();
      setItemInCart(computeTotalItems(response.cart));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkItemInCart();
  }, []);
  return (
    <>
      <Button
        style={{ width: "3rem", height: "3rem", position: "relative" }}
        variant="outline-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-cart"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg>
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
}

export default CartIcon;
