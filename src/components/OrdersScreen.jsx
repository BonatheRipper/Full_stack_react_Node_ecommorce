import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { GetError } from "../util";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { useStateContext } from "./Store";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
const OrdersScreen = () => {
  const navigate = useNavigate();

  const params = useParams();
  const { orderId } = params;
  const { user } = useStateContext();
  const [state, setState] = useState({
    loading: true,
    loadingPay: false,
    successPay: false,
    order: {},
    error: "",
  });
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: state.order.totalPrice } }],
      })
      .then((orderId) => {
        return orderId;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function(details) {
      try {
        setState((prevState) => {
          return { ...prevState, loadingPay: true };
        });
        const { data } = await axios.put(
          `/api/orders/${state.order._id}/pay`,
          details,
          { headers: { authorization: `Bearer ${user.token}` } }
        );
        setState((prevState) => {
          return { ...prevState, loadingPay: false, successPay: true };
        });
        toast.success("Order is Paid ");
      } catch (e) {
        setState((prevState) => {
          return { ...prevState, loadingPay: false };
        });
        toast.error(GetError(e));
      }
    });
  };
  const onError = (err) => {
    toast.error(GetError(err));
  };
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setState((prevState) => {
          return { ...prevState, loading: true };
        });

        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: ` Bearer ${user.token}` },
        });
        setState((prevState) => {
          return { ...prevState, loading: false, order: data };
        });
      } catch (e) {
        setState((prevState) => {
          return { ...prevState, error: GetError(e) };
        });
      }
    };
    if (!user) {
      return navigate("/login");
    }
    if (
      !orderId._id ||
      state.successPay ||
      (orderId._id && orderId._id !== orderId)
    ) {
      fetchOrder();
      if (state.successPay) {
        setState((prevState) => {
          return { ...prevState, loadingPay: false, successPay: false };
        });
      }
    } else {
      const loadPayPalScript = async () => {
        const { data: ClientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${user.token}` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": ClientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };
      loadPayPalScript();
    }
  }, [user, navigate, orderId, paypalDispatch, state.successPay]);
  console.log(state);
  return state.loading ? (
    <LoadingBox />
  ) : state.error ? (
    <MessageBox variant="danger">{state.error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order</title>
      </Helmet>
      <h1 className="my-3">Order:: {state.order ? state.order._id : ""}</h1>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              {" "}
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong>
                {state.order.shippingAddress.fullName} <br />
                <strong>Address:</strong>
                {state.order.shippingAddress.address},
                {state.order.shippingAddress.city},
                {state.order.shippingAddress.postalCode},
                {state.order.shippingAddress.country}
              </Card.Text>
              {state.order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {state.order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card>
            <Card.Title>Payment</Card.Title>
            <Card.Text>
              <strong>Method: </strong>
              {state.order.PaymentMethod}
            </Card.Text>
            {state.order.isPaid ? (
              <MessageBox variant="success">
                Paid at {state.order.paidAt}
              </MessageBox>
            ) : (
              <MessageBox variant="danger">Not Paid</MessageBox>
            )}
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {state.order.orderItems.map((item) => {
                  return (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded img-thumbnail"
                          />
                          <Link to={`/product/${item.slugh}`}>{item.name}</Link>
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
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${state.order.itemPrice.toFixed(2)}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${state.order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${state.order.taxPrice.toFixed(2)}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>Total</strong>
                    </Col>
                    <Col>
                      <strong>${state.order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!state.order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <LoadingBox />
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {state.loadingPay && <LoadingBox></LoadingBox>}
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
export default OrdersScreen;
