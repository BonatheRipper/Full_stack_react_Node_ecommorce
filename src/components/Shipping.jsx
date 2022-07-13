import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "./Store";
import CheckoutSteps from "./CheckoutSteps";
const Shipping = () => {
  const {
    fullName,
    setFullName,
    country,
    setCountry,
    city,
    postalCode,
    setpostalCode,
    setCity,
    setCart,
    user,
    address,
    setAddress,
    Cart,
  } = useStateContext();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ fullName, address, city, postalCode, country })
    );
    const shipDetails = JSON.parse(localStorage.getItem("shippingAddress"));
    if (shipDetails) {
      setCart((prevCart) => {
        return {
          ...prevCart,
          cart: { ...prevCart.cart, ...prevCart.cartItems },
          shippingDetails: shipDetails,
        };
      });
    }
    navigate("/payment");
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2 />
      <div className="container small-container">
        <h1>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="City">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="postal">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setpostalCode(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>

          <div className="mb-3 mt-3">
            <Button variant="primary" type="summit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Shipping;
