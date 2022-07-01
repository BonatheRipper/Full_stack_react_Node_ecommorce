import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useState,
} from "react";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { Helmet } from "react-helmet-async";
import { useStateContext } from "./Store";

import axios from "axios";
import { Row, Col, ListGroup, Card, Badge, Button } from "react-bootstrap";
import Ratings from "./Ratings";
import { useParams } from "react-router-dom";
import { GetError } from "../util";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const ProductScreen = () => {
  const { slug } = useParams();
  const initial = { item: [null], loading: true, error: null };
  const [product, setProduct] = useState(initial);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        setProduct((prevProduct) => {
          return {
            ...prevProduct,
            item: result.data,
            loading: false,
          };
        });
      } catch (e) {
        setProduct((prevProduct) => {
          return {
            ...prevProduct,
            error: GetError(e),
          };
        });
      }
    };
    fetchData();
  }, [slug]);
  const { Cart, setCart } = useStateContext();

  const addToCartHandler = () => {
    setCart((prevCart) => {
      return {
        ...prevCart,
        cart: {
          ...prevCart,
          cartItems: [
            ...prevCart.cart.cartItems,
            { ...product.item, quatity: 1 },
          ],
        },
      };
    });
    console.log(Cart);
  };

  return product.loading ? (
    <LoadingBox />
  ) : product.error ? (
    <MessageBox variant="danger" className>
      {product.error}
    </MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.item.image}
            alt={product.name}
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
            </ListGroup.Item>
            <ListGroup.Item>
              <Ratings
                rating={product.item.rating}
                numReviews={product.item.numReviews}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.item.price}</ListGroup.Item>
            <ListGroup.Item>
              Description : {product.item.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.item.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.item.countInStock > 0 ? (
                        <Badge bg="success">in Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.item.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
