import React from "react";
import { useStateContext } from "./Store";
import { Helmet } from "react-helmet-async";
import { Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import MessageBox from "./MessageBox";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const CartScreen = () => {
  const { Cart, setCart, CartStock, setCartStock } = useStateContext();
  const { cart } = Cart;
  var { cartItems } = cart;
  const navigate = useNavigate();

  const updateCartHandler = async (item, action) => {
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (action === "Add") {
      if (data.countInStock < item.quantity) {
        alert("Sorry. Product is out of  stuck");
        return;
      }
      item.quantity = item.quantity + 1;
    } else if (action === "Minus") {
      item.quantity = item.quantity - 1;
    } else if (action === "Trash") {
      cartItems = Cart.cart.cartItems.filter((el) => {
        return item._id !== el._id;
      });
      setCart((prev) => {
        return {
          ...prev,
          cart: { ...prev.cart, cartItems },
        };
      });
    }
    setCartStock(
      cartItems.reduce((total, object) => {
        return object.quantity + total;
      }, 0)
    );
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  const proceedToCheckOut = () => {
    navigate("/login?redirect=/shipping");
  };
  useEffect(() => {
    setCartStock(
      cartItems.reduce((total, object) => {
        return object.quantity + total;
      }, 0)
    );
  }, [Cart.cart.cartItems.length]);
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      />
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>

                    <Col md={3}>
                      <Button
                        onClick={() => updateCartHandler(item, "Minus")}
                        variant="light"
                        disabled={item.quantity === 0}
                      >
                        <i
                          className="fa fa-minus-circle"
                          aria-hidden="true"
                        ></i>
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        onClick={() => updateCartHandler(item, "Add")}
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                      </Button>
                    </Col>

                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => updateCartHandler(item, "Trash")}
                        variant="light"
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal (
                    {cartItems.reduce((total, object) => {
                      return object.quantity + total;
                    }, 0)}{" "}
                    items) : $
                    {cart.cartItems.reduce((total, object) => {
                      return object.quantity * object.price + total;
                    }, 0)}
                  </h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                      onClick={proceedToCheckOut}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
