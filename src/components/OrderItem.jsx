import React from "react";
import { Stack, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import IncreaseDecreaseItem from "./IncreaseDecreaseItem";
import { changeNumberToThreeDicemel } from "../helper/fixedDicemel";


function OrderItem({item}) {

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
        <div>BHD {changeNumberToThreeDicemel(item.product.price * item.quantity)}</div>
      </Stack>
    </>
  );
}

export default OrderItem;
