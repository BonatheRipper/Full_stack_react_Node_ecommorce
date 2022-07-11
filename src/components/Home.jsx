import logger from "use-reducer-logger";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Products from "./Products";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import React, { useEffect, useState } from "react";
const Home = () => {
  const initial = { items: [null], loading: true, error: null };

  const [products, setProducts] = useState(initial);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/api/products");
        setProducts((prevProducts) => {
          return {
            ...prevProducts,
            items: result.data,
            loading: false,
          };
        });
      } catch (e) {
        setProducts((prevProducts) => {
          return {
            ...prevProducts,
            error: e.message,
          };
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="featuredHeader">Featured Products</h1>
      <div className="productsContainer">
        {products.loading ? (
          <LoadingBox />
        ) : products.error ? (
          <MessageBox variant="danger">{products.error}</MessageBox>
        ) : (
          <Row>
            {products.items.map((item) => {
              return (
                <Col
                  key={item.slug + Math.floor(Math.random() * 2292)}
                  className="m-3"
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Products item={item} />
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Home;
