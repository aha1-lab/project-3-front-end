import React from "react";
import { Stack, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import IncreaseDecreaseItem from "./IncreaseDecreaseItem";
import { changeNumberToThreeDicemel } from "../helper/fixedDicemel";


function CartItem({ item, handleRemoveItem, handleQuantityChange }) {

  return (
    <>
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center shadow-lg"
      >
        <img
          src={`${import.meta.env.VITE_BACK_END_SERVER_URL}/${
            item.product.image
          }`}
          style={{ width: "125px", height: "75px", oobjectFit: "cover" }}
        />
        <div className="me-auto">
          <div>
            {item.product.name}{" "}
            {item.quantity > 1 && (
              <span className="text-muted" style={{ fontSize: ".65rem" }}>
                {item.quantity}x
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            BHD {item.product.price}
          </div>
        </div>
        <div className="me-auto">
          <IncreaseDecreaseItem
            productId={item._id}
            stock={item.product.stock}
            currentQuantity={item.quantity}
            handleQuantityChange = {handleQuantityChange}
          />
        </div>
        <div>BHD {changeNumberToThreeDicemel(item.product.price * item.quantity)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => handleRemoveItem(item._id)}
        >
          X
        </Button>
      </Stack>
    </>
  );
}

export default CartItem;
