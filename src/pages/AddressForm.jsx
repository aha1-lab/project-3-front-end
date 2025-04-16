import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addAddress, updateAddress, getAddressDestails } from "../services/AddressService";
import { useNavigate, useParams } from "react-router";

const initialState = {
  home: "",
  road: "",
  block: "",
  country:"",
  mobilePhone: "",
};


function AddressForm() {

  const {itemId} = useParams();
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState(initialState);

  const handleChange = ({ target }) => {
    setDataForm({ ...dataForm, [target.name]: target.value });
  };

  const addressDetails = async()=>{
    try {
      const response = await getAddressDestails(itemId);
      console.log(response)
      setDataForm(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(itemId){
      addressDetails();
    }
  },[])
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(itemId){
      const response = await updateAddress(dataForm, itemId);
    }else{
      const response = await addAddress(dataForm);  
    }
    setDataForm(initialState);
    navigate(`/`);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="home">Home Number</Form.Label>
          <Form.Control
            type="number"
            name="home"
            id="home"
            onChange={handleChange}
            value={dataForm.home}
          />
          <Form.Label htmlFor="road">Road</Form.Label>
          <Form.Control
            type="number"
            name="road"
            id="road"
            onChange={handleChange}
            value={dataForm.road}
          />
          <Form.Label htmlFor="block">Block</Form.Label>
          <Form.Control
            type="number"
            name="block"
            id="block"
            onChange={handleChange}
            value={dataForm.block}
          />
          <Form.Label htmlFor="country">Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            id="country"
            onChange={handleChange}
            value={dataForm.country}
          />
          <Form.Label htmlFor="mobilePhone">Mobile Phone</Form.Label>
          <Form.Control
            type="number"
            name="mobilePhone"
            id="mobilePhone"
            onChange={handleChange}
            value={dataForm.mobilePhone}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {itemId ? "Update " : "Add "}
          Address
        </Button>
      </Form>
    </>
  );
}

export default AddressForm;
