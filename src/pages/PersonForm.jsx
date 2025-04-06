import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {addPerson} from "../services/PersonService";


const initialState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
};
function PersonForm() {
  const [dataForm, setDataForm] = useState(initialState);

  const handleChange = ({ target }) => {
    setDataForm({ ...dataForm, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(dataForm);
    const response = await addPerson(dataForm);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="firstName">First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
            value={dataForm.firstName}
          />
          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
            value={dataForm.lastName}
          />
          <Form.Label htmlFor="dateOfBirth">Date of birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            onChange={handleChange}
            value={dataForm.dateOfBirth}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default PersonForm;
