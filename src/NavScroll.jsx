import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavScroll() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Runge Kutta Method</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Inserir Valor de R</Nav.Link>
            <Nav.Link href="#action2">Inserir Valor de L</Nav.Link>
            <Nav.Link href="#action3">Inserir Valor de C</Nav.Link>
             <NavDropdown title="Escolher Fonte de Corrente" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action4">Corrente Contínua</NavDropdown.Item>
              <NavDropdown.Item href="#action5">
                Corrente Alternada
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;
