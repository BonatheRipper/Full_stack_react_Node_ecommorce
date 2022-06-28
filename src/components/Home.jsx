import logger from "use-reducer-logger";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Products from "./Products";
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useState,
} from "react";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: "",
    products: [],
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data.products });
      } catch (e) {
        dispatch({ type: "FETCH_FAIL", payload: e.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="featuredHeader">Featured Products</h1>
      <div className="productsContainer">
        <Row>
          {products.map((item) => {
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
      </div>
    </div>
  );
};

export default Home;
