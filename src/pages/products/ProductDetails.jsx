import React, { useEffect, useState } from "react";
import {
  getProductDetails,
  deleteProduct,
} from "../../services/ProductService";
import { useParams, Link } from "react-router";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import AddToCart from "../../components/AddToCart";

function productDetails() {
  const { user, logout } = useContext(authContext);
  const { itemId } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  const getDetails = async () => {
    const productData = await getProductDetails(itemId);
    setProductDetails(productData);
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteProduct(productDetails._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Product Details</h1>
      <div className="container">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-8"></div>
        </div>
      </div>
      {productDetails && (
        <>
          <h2>{productDetails.name}</h2>
          <img
            src={`${import.meta.env.VITE_BACK_END_SERVER_URL}/${
              productDetails.image
            }`}
            className="card-img-top"
            alt=""
          />
          <p>{productDetails.description}</p>
          <p>Condition: {productDetails.condition}</p>
          <p>Stock: {productDetails.stock}</p>
          {user.username === productDetails.seller.username ? (
            <>
              <Link to={`/products/update/${productDetails._id}`}>
                <Button>Update</Button>
              </Link>
              <Button onClick={handleDelete}>Delete</Button>
            </>
          ) : (
            <AddToCart stock={productDetails.stock} porductId = {productDetails._id}/>
          )}
        </>
      )}
    </>
  );
}

export default productDetails;
