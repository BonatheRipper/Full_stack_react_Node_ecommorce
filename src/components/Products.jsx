import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Ratings from "./Ratings";
const Products = (props) => {
  const { item } = props;
  return (
    <Card className="products">
      <Link to={`/product${item.slug}`}>
        <img className="card-img-top" src={item.image} alt={item.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${item.slug}`}>
          <Card.Title>{item.name}</Card.Title>
        </Link>
        <Ratings rating={item.rating} numReviews={item.numReviews} />
        <Card.Text>${item.price}</Card.Text>
        <Button>Add to cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Products;
