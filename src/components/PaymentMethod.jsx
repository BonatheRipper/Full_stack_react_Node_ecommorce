import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Navigate, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { useStateContext } from "./Store";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const { setCart, Cart } = useStateContext();
  const { shippingDetails, PaymentMethod } = Cart;
  const [PaymentMethodName, setPaymentMethodName] = useState(
    PaymentMethod || "PayPal"
  );
  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("paymentMethodLocal", PaymentMethodName);
    const paymentMethodLocal = localStorage.getItem("paymentMethodLocal");
    if (paymentMethodLocal) {
      setCart((prevCart) => {
        return {
          ...prevCart,
          PaymentMethod: paymentMethodLocal,
        };
      });
    }
    navigate("/placeorder");
  };
  useEffect(() => {
    if (!shippingDetails.address) {
      navigate("/shipping");
    }
  }, [shippingDetails, navigate]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3"> Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              onChange={(e) => setPaymentMethodName(e.target.value)}
              checked={PaymentMethodName === "PayPal"}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              onChange={(e) => setPaymentMethodName(e.target.value)}
              checked={PaymentMethodName === "Stripe"}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Paystack"
              label="Paystack"
              value="Paystack"
              onChange={(e) => setPaymentMethodName(e.target.value)}
              checked={PaymentMethodName === "Paystack"}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Flutterwave"
              label="Flutterwave"
              value="Flutterwave"
              onChange={(e) => setPaymentMethodName(e.target.value)}
              checked={PaymentMethodName === "Flutterwave"}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethod;
