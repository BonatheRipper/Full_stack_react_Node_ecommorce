import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { useStateContext } from "./Store";
import axios from "axios";

import Ratings from "./Ratings";
const Products = (props) => {
  const { item } = props;
  const { Cart, setCart, CartStock, setCartStock } = useStateContext();
  const { cart } = Cart;

  const addToCart = async (item) => {
    const existItem = cart.cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of  stock");
      return;
    }
    if (!existItem) {
      setCart((prevCart) => {
        return {
          ...prevCart,
          cart: {
            ...prevCart,
            cartItems: [
              ...prevCart.cart.cartItems,
              { ...item, quantity: quantity },
            ],
          },
        };
      });
    } else {
      existItem.quantity = quantity;
    }
    setCartStock(0);
    console.log(Cart);
  };
  useEffect(() => {
    setCartStock(
      cart.cartItems.reduce((total, object) => {
        return object.quantity + total;
      }, 0)
    );
    localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
  }, [Cart.cart.cartItems.length]);
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
        {item.countInStock === 0 ? (
          <Button disabled variant="light">
            Out of Stock
          </Button>
        ) : (
          <Button onClick={() => addToCart(item)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Products;
