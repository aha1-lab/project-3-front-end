import React from "react";
import { Link } from "react-router";
import { Button, ButtonGroup, Card } from "react-bootstrap";

function ProductCard({ product }) {

  return (
    <Card>
      <Link to={`/products/${product._id}`}>
      <Card.Img
        variant="top"
        src={`${import.meta.env.VITE_BACK_END_SERVER_URL}/${product.image}`}
        height="150px"
        style={{ objectFit: "cover" }}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-item-baseline mb-2">
          <span className="fs-2">{product.name}</span>
          <span className="ms-2 text-muted">BHD {product.price}</span>
        </Card.Title>
        <Card.Subtitle className="mb-4">
          Condition: {product.condition}
        </Card.Subtitle>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
