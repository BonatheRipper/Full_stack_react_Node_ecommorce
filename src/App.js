import React, { useEffect, useState } from "react";
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
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Helmet } from "react-helmet-async";
import { useStateContext } from "./components/Store";
import { toast, ToastContainer } from "react-toastify";
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
import { GetError } from "./util";
import axios from "axios";
import SearchBtn from "./components/SearchBtn";
import SearchScreen from "./components/SearchScreen";
import ProtectedRoute from "./components/protectedRoutes";
const App = () => {
  const { CartStock, user, setUser } = useStateContext();
  const [sidebarisOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([false]);

  const Logout = () => {
    setUser(null);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("user");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethodLocal");
    window.location.href = "/login";
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        console.log(data);
        setCategories(data);
      } catch (e) {
        toast.error(GetError(e));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarisOpen
            ? "d-flex flex-column site-container active-con"
            : "d-flex flex-column site-container"
        }
      >
        <ToastContainer position="bottom-center" limit={1} />

        <Helmet>
          <title>Ripper</title>
        </Helmet>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarisOpen)}
              >
                <i className="fa fa-bars" aria-hidden="true"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>Ripper</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbarr-nav" />
              <Navbar.Collapse id="basic-navbarr-nav">
                <SearchBtn />
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
                  {user && user.isAdmin && (
                    <NavDropdown title="admin-nav-dropdown">
                      <LinkContainer to="/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarisOpen
              ? "active-nav side-navbar d-flex justify-content-between flex-wrap  flex-column "
              : "side-navbarHide  d-flex justify-content-between flex-wrap  flex-column "
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>

            {categories.map((cat) => (
              <Nav.Item key={cat}>
                <LinkContainer
                  to={`/search?category=${cat}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{cat}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route path="/shipping" element={<Shipping />} />
              <Route path="/search" element={<SearchScreen />} />

              <Route path="/register" element={<Register />} />
              <Route path="/payment" element={<PaymentMethod />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:orderId"
                element={
                  <ProtectedRoute>
                    <OrdersScreen />
                  </ProtectedRoute>
                }
              />
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
