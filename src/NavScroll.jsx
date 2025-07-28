import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// NavScroll agora é apenas a barra de navegação superior
function NavScroll() { // Não recebe mais as props handleSimulate e handleDownloadCSV
  return (
    <Navbar bg="light" expand="lg" className="mb-4"> {/* Adicionado mb-4 para espaçamento inferior */}
      <Container fluid>
        <Navbar.Brand href="#">Runge Kutta Method</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0" navbarScroll> {/* ms-auto para alinhar à direita */}
            {/* Os campos de input e botões foram movidos para App.jsx */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;
