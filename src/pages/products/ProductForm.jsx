import React, { useState, useEffect } from "react";
import {
  addProduct,
  getProductDetails,
  updateProductDetails,
} from "../../services/ProductService";
import { useNavigate, useParams } from "react-router";
const initialState = {
  name: "",
  description: "",
  price: 1.0,
  stock: 1,
  condition: "new",
  category: "",
  file: null,
};

function ProductForm() {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState(initialState);

  const { itemId } = useParams();

  const productDetails = async () => {
    try {
      const oneProduct = await getProductDetails(itemId);
      setDataForm(oneProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (itemId) productDetails();
  }, []);

  const handleChange = ({ target }) => {
    if (target.type === "file") {
      setDataForm({ ...dataForm, [target.name]: target.files[0] });
    } else {
      setDataForm({ ...dataForm, [target.name]: target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in dataForm) {
      formData.append(key, dataForm[key]);
    }
    let response = null;
    if (itemId) {
      response = await updateProductDetails(itemId, formData);
    } else {
      response = await addProduct(formData);
    }
    setDataForm(initialState);
    navigate(`/products/${response._id}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className=" mt-3">
          Product name:
        </label>
        <input
          className="form-control"
          type="text"
          name="name"
          id="name"
          value={dataForm.name}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="description" className=" mt-3">
              Description:
            </label>
            <input
              className="form-control"
              type="text"
              name="description"
              id="description"
              value={dataForm.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="price" className=" mt-3">
              Price:
            </label>
            <input
              className="form-control"
              type="number"
              name="price"
              id="price"
              value={dataForm.price}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className=" mt-3" htmlFor="stock">
          stock:
        </label>
        <input
          className="form-control"
          type="number"
          name="stock"
          id="stock"
          value={dataForm.stock}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className=" mt-3" htmlFor="category">
          Category:
        </label>
        <input
          className="form-control"
          type="text"
          name="category"
          id="category"
          value={dataForm.category}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="condition" className=" mt-3">
          condition:
        </label>
        <select
          className="form-control"
          name="condition"
          id="condition"
          value={dataForm.condition}
          onChange={handleChange}
        >
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
      </div>
      <div className="form-group">
        <label className="mt-3" htmlFor="file">
          Upload file:
        </label>
        <input
          className="form-control"
          type="file"
          name="file"
          id="file"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        {itemId ? "Update " : "Add "}
        Product
      </button>
    </form>
  );
}

export default ProductForm;
