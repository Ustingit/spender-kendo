import React, {useState} from 'react';
import '../../App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

interface Props {
  onFilterChange: (filterValue: string) => void
}

export default function TopNavbar(props: Props) {
    const [searchValue, setSearchValue] = useState<string>("");

    return (
        <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Where are the money, Lebovsky ?</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Types</Nav.Link>
            <NavDropdown title="Reports" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Month-To-Month</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Aggregated-Year
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Full-time
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Finansial advice
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button variant="outline-success" onClick={() => props.onFilterChange(searchValue)} >Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}