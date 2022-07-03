import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import ProductScreen from "./components/ProductScreen";
import { Navbar, Container, Nav, CarouselItem, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Helmet } from "react-helmet-async";
import { useStateContext } from "./components/Store";
import CartScreen from "./components/cartScreen";

const App = () => {
  const { Cart, CartStock } = useStateContext();
  const { cart } = Cart;
  // // const sum = cart.cartItems.reduce((accumulator, object) => {
  // //   if (object.quantity) return accumulator + object.quantity;
  // // }, 0);
  // for (let x of cart.cartItems) {
  //   console.log(x.quantity);
  // }
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <Helmet>
          <title>Ripper</title>
        </Helmet>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Ripper</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {CartStock > 0 && (
                    <Badge pill bg="danger">
                      {CartStock}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
