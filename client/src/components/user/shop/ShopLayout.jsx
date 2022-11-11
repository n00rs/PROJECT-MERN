import { Navbar, Nav, NavDropdown, Container, Badge } from "react-bootstrap";
import { Link, NavLink, Outlet } from "react-router-dom";
import { CartIcon } from "../../../assets/icons/CartIcon";
import { FacebookIcon } from "../../../assets/icons/FacebookIcon";
import { InstagramIcon } from "../../../assets/icons/InstagramIcon";
import { SnapchatIcon } from "../../../assets/icons/SnapchatIcon";
import TwitterIcon from "../../../assets/icons/TwitterIcon";
import { WishListIcon } from "../../../assets/icons/WishListIcon";
import styles from "./ShopLayout.module.css";

const icons = [
  { element: <InstagramIcon />, link: "https://instagram.com" },
  { element: <FacebookIcon />, link: "https://fb.com" },
  { element: <TwitterIcon />, link: "https://twitter.com" },
  { element: <SnapchatIcon />, link: "https://snapchat.com" },
];

const iconContent = icons.map((ele) => (
  <li className="d-inline-block me-1" key={Math.random()}>
    <a
      className="text-decoration-none text-dark-hover transition-all"
      target="_blank"
      rel="noopener noreferrer"
      href={ele.link}
    >
      {ele.element}
    </a>
  </li>
));
const cards = ["paypal", "mastercard", "american-express", "visa"];

const cardsContent = cards.map((cr) => (
  <li
    className="bg-light p-2 d-flex align-items-center justify-content-center me-2"
    key={Math.random()}
  >
    <i className={`${styles["pi"]} ${styles["pi-sm"]} ${styles[`pi-${cr}`]}`}></i>
  </li>
));

export const ShopLayout = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to='/shop/products?category=all' >Features</NavLink>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Link>
                <WishListIcon />
                <Badge pill bg="secondary">
                  3
                </Badge>
              </Link>

              <Link>
                <CartIcon />

                <Badge pill bg="secondary">
                  3
                </Badge>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />

      <footer className="border-top py-3 p-5 mt-4">
        <Container fluid>
          <div className="d-flex justify-content-between align-items-center flex-column flex-lg-row">
            <div>
              <ul className="list-unstyled">{iconContent}</ul>
            </div>
            <div className="d-flex align-items-center justify-content-end flex-column flex-lg-row">
              <p className="small m-0 text-center text-lg-start">
                &copy; 2021 Lorem ipsum is a placeholder text commonly
                <a href="/oops"> Rocket SCience</a>
              </p>
              <ul className="list-unstyled mb-0 ms-lg-4 mt-3 mt-lg-0 d-flex justify-content-end align-items-center">
                {cardsContent}
              </ul>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};
