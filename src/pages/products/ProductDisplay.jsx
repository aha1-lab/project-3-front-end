import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { getIndex } from "../../services/ProductService";
import { Row, Col } from "react-bootstrap";
import SortSelector from "../../components/SortSelector";
import { useLocation } from "react-router";

function ProductDisplay() {
  const [productList, setProductList] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const getProducts = async (searchQuery = "") => {
    try {
      let getList = await getIndex("");

      if(searchQuery){
          getList = getList.filter((item)=>{
              return item && item.name && item.name.toLowerCase().includes(searchQuery)
            })
        }
      setProductList(getList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    getProducts(searchQuery);
  }, [location.search]);

  const handleSelectSortOrder = async(value)=>{
    try {
      let sortOrder = `?order=${value}`;
      const getList = await getIndex(sortOrder);
      setProductList(getList);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <SortSelector  handleSelectSortOrder= {handleSelectSortOrder}/>
      <Row md={2} xs={1} lg={3} className="g-3">
        {productList && productList.map((product) => (
            <Col key={product._id}>
              <ProductCard  product={product} />
            </Col>
          ))}
      </Row>
    </>
  );
}

export default ProductDisplay;
