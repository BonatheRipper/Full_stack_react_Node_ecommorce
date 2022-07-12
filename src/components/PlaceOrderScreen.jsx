import axios from "axios";
import React, { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GetError } from "../util";
import CheckoutSteps from "./CheckoutSteps";
import LoadingBox from "./LoadingBox";
import { useStateContext } from "./Store";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const { Cart, user, setCart } = useStateContext();
  const [loading, setLoading] = useState(false);
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  Cart.itemPrice = round2(
    Cart.cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  Cart.shippingPrice = Cart.itemPrice > 100 ? round2(0) : round2(10);
  Cart.taxPrice = round2(0.15 * Cart.itemPrice);
  Cart.totalPrice = Cart.itemPrice + Cart.shippingPrice + Cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: Cart.cart.cartItems,
          shippingAddress: Cart.shippingDetails,
          itemPrice: Cart.itemPrice,
          shippingPrice: Cart.shippingPrice,
          taxPrice: Cart.taxPrice,
          totalPrice: Cart.totalPrice,
          PaymentMethod: Cart.PaymentMethod,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCart((prevCart) => {
        return {
          ...prevCart,
          cart: { cartItems: [] },
        };
      });
      localStorage.removeItem("cartItems");

      setLoading(false);
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(GetError(err));
    }
  };
  useEffect(() => {
    if (!Cart.PaymentMethod) {
      navigate("/payment");
    }
  }, [Cart, navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong>
                {Cart.shippingDetails.fullName}
                <br />
                <strong>Address:</strong>
                {Cart.shippingDetails.address}, {Cart.shippingDetails.city},
                {Cart.shippingDetails.postalCode},{" "}
                {Cart.shippingDetails.country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong>
                {Cart.PaymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Cart Items</Card.Title>
              <ListGroup variant="flush">
                {Cart.cart.cartItems.map((item) => {
                  return (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded  img-thumbnail"
                          />
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={3}>
                          <span>{item.quantity}</span>
                        </Col>
                        <Col md={3}>
                          <span>${item.price}</span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
              <Link to="/cart">Edit Cart</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${Cart.itemPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${Cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${Cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${Cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={Cart.cart.cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                    {loading && <LoadingBox />}
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

export default PlaceOrderScreen;
