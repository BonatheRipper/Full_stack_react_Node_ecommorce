import React from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GetError, GetSuccess } from "../util";
import { useState, useEffect } from "react";
import { useStateContext } from "./Store";

const Register = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const { user, setUser } = useStateContext();

  const FormSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (password !== password2) {
        toast.error("password does not match");
        return;
      }
      const { data } = await axios.post("/api/users/register", {
        email,
        password,
        fullName,
        password2,
      });
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        const UserInfo = JSON.parse(localStorage.getItem("user"));
        if (UserInfo) {
          setUser((prev) => {
            return {
              ...UserInfo,
            };
          });
        }
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
        <title>Create Account</title>
      </Helmet>
      <div className="container small-container">
        <h1 className="my-3">Create Account</h1>
        <Form onSubmit={FormSubmitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="password2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Form.Group>
          <div className="m-3 mt-3">
            <Button type="submit">Create Account</Button>
          </div>
          <div className="m-3">
            Already have an account? <Link to={`/login`}>Sign In</Link>{" "}
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
