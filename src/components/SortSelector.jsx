import React from "react";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";

function SortSelector({ handleSelectSortOrder }) {
  const sortOrders = [
    { value: "1", label: "Low to Hiegh" },
    { value: "-1", label: "Low to Hiegh" },
  ];

  let variant = "outline-primary";
  return (
    <DropdownButton
      as={ButtonGroup}
      key={variant}
      id={`dropdown-variants-${variant}`}
      variant={variant.toLowerCase()}
      title={"Sort By"}
    >
      {sortOrders.map((order) => (
        <Dropdown.Item
          key={order.value}
          eventKey={order.value}
          onClick={() => handleSelectSortOrder(order.value)}
        >
          {order.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default SortSelector;
