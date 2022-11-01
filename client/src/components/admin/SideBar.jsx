import React from "react";
import { Col, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Dash } from "../../assets/icons/Dash";
export const SideBar = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="black"
        variant="dark"
        className="text-warning"
      >
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link eventKey={2} href="#memes">
                Logout
              </Nav.Link>
            </Nav>
            <Nav></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Col md={2} className="bg-black">
        <div className="d-flex flex-column flex-shrink-0 p-3 text-warning sticky-top  h-25 position-sticky ">
          <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32">
              <use xlinkHref="#grid"></use>
            </svg>
            <span className="fs-4">Sidebar</span>
          </a>
          <hr />
          <ul className="nav nav-pills  flex-column mb-auto">
            <li className="nav-item">
              <NavLink
                to="/admin/dash"
                className={({ isActive }) =>
                  isActive ? "nav-link active bg-warning" : "nav-link"
                }
              >
                <Dash />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/manage-products"
                className={({ isActive }) =>
                  isActive ? "nav-link active bg-warning" : "nav-link"
                }
              >
                <svg className="bi me-2" width="16" height="16">
                  <use xlinkHref="#speedometer2"></use>
                </svg>
                Product Management
              </NavLink>
            </li>
            <li>
              <NavLink to='/admin/manage-orders'  className={({ isActive }) =>
                  isActive ? "nav-link active bg-warning" : "nav-link"
                }>
                <svg className="bi me-2" width="16" height="16">
                  <use xlinkHref="#table"></use>
                </svg>
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to='/admin/add-products'  className={({ isActive }) =>
                  isActive ? "nav-link active bg-warning" : "nav-link"
                }>
                <svg className="bi me-2" width="16" height="16">
                  <use xlinkHref="#grid"></use>
                </svg>
                Add Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/manage-users"  className={({ isActive }) =>
                  isActive ? "nav-link active bg-warning" : "nav-link"
                }>
                <svg className="bi me-2" width="16" height="16">
                  <use xlinkHref="#people-circle"></use>
                </svg>
                Users
              </NavLink>
            </li>
          </ul>
          <hr />
        </div>
      </Col>
    </>
  );
};
