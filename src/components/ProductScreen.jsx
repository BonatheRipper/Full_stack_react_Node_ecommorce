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
import { useNavigate, useParams } from "react-router-dom";
import { GetError } from "../util";

const ProductScreen = () => {
  const navigate = useNavigate();
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
  const { Cart, setCart, CartStock, setCartStock } = useStateContext();
  const { cart } = Cart;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product.item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product.item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of  stock");
      return;
    }
    if (!existItem) {
      setCart((prevCart) => {
        return {
          ...prevCart,
          cart: {
            ...prevCart,
            cartItems: [
              ...prevCart.cart.cartItems,
              { ...product.item, quantity: quantity },
            ],
          },
        };
      });
    } else {
      existItem.quantity = quantity;
    }
    setCartStock(0);

    navigate("/cart");
  };

  useEffect(() => {
    setCartStock(
      cart.cartItems.reduce((total, object) => {
        return object.quantity + total;
      }, 0)
    );
    localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
  }, [Cart.cart.cartItems.length]);

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
