import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import ProductScreen from "./components/ProductScreen";
import {
  Navbar,
  Container,
  Nav,
  CarouselItem,
  Badge,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Helmet } from "react-helmet-async";
import { useStateContext } from "./components/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartScreen from "./components/cartScreen";
import Login from "./components/Login";
import Shipping from "./components/Shipping";
import Register from "./components/Register";
import PaymentMethod from "./components/PaymentMethod";
import PlaceOrderScreen from "./components/PlaceOrderScreen";
import OrdersScreen from "./components/OrdersScreen";
import OrderHistory from "./components/orderHistory";
import Profile from "./components/Profile";
const App = () => {
  const { Cart, CartStock, user, setUser } = useStateContext();
  const { cart } = Cart;
  const Logout = () => {
    setUser(null);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("user");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethodLocal");
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />

        <Helmet>
          <title>Ripper</title>
        </Helmet>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Ripper</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbarr-nav" />
              <Navbar.Collapse id="basic-navbarr-nav">
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {CartStock > 0 && (
                      <Badge pill bg="danger">
                        {CartStock}
                      </Badge>
                    )}
                  </Link>
                  {user ? (
                    <NavDropdown title={user.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#logout"
                        onClick={Logout}
                      >
                        Logout
                      </Link>
                      \{" "}
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/login">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/shipping" element={<Shipping />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment" element={<PaymentMethod />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/orderhistory" element={<OrderHistory />} />
              <Route path="/order/:orderId" element={<OrdersScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
