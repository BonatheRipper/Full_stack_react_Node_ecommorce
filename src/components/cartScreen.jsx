import React from "react";
import { useStateContext } from "./Store";
import { Helmet } from "react-helmet-async";
import { Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import MessageBox from "./MessageBox";
import { Link } from "react-router-dom";
const CartScreen = () => {
  const { Cart, setCart, CartStock, setCartStock } = useStateContext();
  const { cart } = Cart;
  const { cartItems } = cart;
  console.log(cartItems);
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
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                      >
                        <i
                          className="fa fa-minus-circle"
                          aria-hidden="true"
                        ></i>
                      </Button>
                      <span>{item.quatity}</span>
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                      </Button>
                    </Col>

                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button variant="light">
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
                      return object.quatity + total;
                    }, 0)}{" "}
                    items) : $
                    {cart.cartItems.reduce((total, object) => {
                      return object.quatity * object.price + total;
                    }, 0)}
                  </h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
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
