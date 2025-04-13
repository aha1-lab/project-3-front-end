import { useState } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";

function SearchInput() {

  const navigate = useNavigate();

  const [dataForm, setDataForm] = useState({search: ""});

  function handleChange({ target }) {
    setDataForm({ ...dataForm, [target.name]: target.value });
  }
  
  function handleSearch() {
    let searchValue = dataForm.search;
    // setDataForm("");
    navigate(`/?search=${searchValue}`);
  }

  return (
    <InputGroup className="me-auto pe-3">
      <Button
        variant="outline-secondary"
        id="button-addon1"
        onClick={() => {
            handleSearch();
          }}
      >
        Search
      </Button>
      <Form.Control
        type="text"
        name="search"
        id="search"
        value={dataForm.search}
        onChange={handleChange}
      />
    </InputGroup>
  );
}

export default SearchInput;
