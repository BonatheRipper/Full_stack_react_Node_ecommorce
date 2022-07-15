import React from "react";
import { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

const SearchBtn = () => {
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    navigate(query ? `/search/?query=${query} ` : "/search");
  };
  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          placeholder="Search products..."
          aria-label="Search products"
          aria-describedby="button-search"
          onChange={(e) => setQuery(e.target.value)}
        ></FormControl>
        <Button
          variant="btn btn-outline-primary "
          type="submit"
          id="button-search"
        >
          <i className="fa fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBtn;
