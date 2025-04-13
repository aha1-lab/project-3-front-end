import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { updateProductToCart } from "../services/CartService";

function IncreaseDecreaseItem({ stock, productId, currentQuantity, handleQuantityChange }) {


  return (
    <div className="mt-auto">
      <div
        className="d-flex align-items-center flex-column"
        style={{ gap: "0.5rem" }}
      >
        <div
          className="d-flex align-items-center justify-conten-center"
          style={{ gap: "0.5rem" }}
        >
          <Button
            onClick={() => {
              handleQuantityChange(-1, stock, productId, currentQuantity);
            }}
          >
            -
          </Button>
          <div>
            <span className="fs-3">{currentQuantity}</span>
          </div>
          <Button
            onClick={() => {
              handleQuantityChange(1, stock, productId, currentQuantity);
            }}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
}

export default IncreaseDecreaseItem;
