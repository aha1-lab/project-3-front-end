import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { addProductToCart } from "../services/CartService";


function AddToCart({stock, porductId}) {
    const [quantity, setQuantity] = useState(0);
    const [errorMessage,setErrorMessage] = useState(null)


    const addToCart = async ()=>{
        try {
            const dataForm = {
                product : porductId,
                quantity : quantity,
            }
            const response = await addProductToCart(dataForm);
            window.location.reload();
        } catch (err) {
          alert(err.response.data.err)
          setErrorMessage(err.response.data.err)
        }
    }
    const handleAdd = (addType)=>{
        if (addType === 1){
            if(quantity < stock){
                setQuantity(quantity+1);
            }
        }else{
            if(quantity>0){
                setQuantity(quantity-1);
            }
        }
    }
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
            <Button onClick={()=>{handleAdd(-1)}}>-</Button>
            <div>
              <span className="fs-3">{quantity}</span>
            </div>
            <Button onClick={()=>{handleAdd(1)}}>+</Button>
          </div>
            {quantity > 0 && 
                <Button onClick={addToCart} size="sm">
                    Add To Cart
                </Button>
            }
            {errorMessage && <h2>ERROR: {errorMessage}</h2>}
        </div>
    </div>
  );
}

export default AddToCart;
