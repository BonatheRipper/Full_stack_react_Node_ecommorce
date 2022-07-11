import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GetError } from "../util";
import { useStateContext } from "./Store";
const Login = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useStateContext();

  const FormSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(data));
      const UserInfo = JSON.parse(localStorage.getItem("user"));
      if (UserInfo) {
        setUser((prev) => {
          return {
            ...UserInfo,
          };
        });
      }

      navigate(redirect || "/");
    } catch (e) {
      if (e) {
        toast.error(GetError(e));
      }
    }
  };
  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user]);
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="container small-container">
        <h1 className="my-3">Sign In</h1>
        <Form onSubmit={FormSubmitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="m-3 mt-3">
            <Button type="submit">Sign In</Button>
          </div>
          <div className="m-3">
            New customer ?{" "}
            <Link to={`/signup?redirect=${redirect}`}>Register Account</Link>{" "}
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
