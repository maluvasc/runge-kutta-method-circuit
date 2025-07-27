import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavScroll({ params, handleChange, handleSimulate }) {
  
  const fonteTitle =
    params.source_type === "DC"
      ? "Corrente Contínua"
      : params.source_type === "AC"
      ? "Corrente Alternada"
      : "Fonte de Corrente";

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Runge Kutta Method</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Form className="d-flex align-items-center me-2">
              <Form.Label className="me-1 mb-0">Tempo da simulação em segundos:</Form.Label>
              <Form.Control
                type="number"
                name="simulation_time_end"
                value={params.simulation_time_end}
                onChange={handleChange}
                style={{ width: "80px" }}
              />
            </Form>
            
            <Form className="d-flex align-items-center me-2">
              <Form.Label className="me-1 mb-0">R:</Form.Label>
              <Form.Control
                type="number"
                name="R"
                value={params.R}
                onChange={handleChange}
                style={{ width: "80px" }}
              />
            </Form>

            <Form className="d-flex align-items-center me-2">
              <Form.Label className="me-1 mb-0">L:</Form.Label>
              <Form.Control
                type="number"
                name="L"
                value={params.L}
                onChange={handleChange}
                style={{ width: "80px" }}
              />
            </Form>

            <Form className="d-flex align-items-center me-2">
              <Form.Label className="me-1 mb-0">C:</Form.Label>
              <Form.Control
                type="number"
                name="C"
                value={params.C}
                onChange={handleChange}
                style={{ width: "80px" }}
              />
            </Form>
            {/* CAMPOS DINÂMICOS DEPENDENDO DO TIPO DE FONTE */}
            {params.source_type === "DC" && (
              <Form className="d-flex align-items-center me-2">
                <Form.Label className="me-1 mb-0">Tensão DC:</Form.Label>
                <Form.Control
                  type="number"
                  name="dc_voltage"
                  value={params.dc_voltage || ""}
                  onChange={handleChange}
                  style={{ width: "100px" }}
                />
              </Form>
            )}

            {params.source_type === "AC" && (
              <>
                <Form className="d-flex align-items-center me-2">
                  <Form.Label className="me-1 mb-0">Amplitude AC:</Form.Label>
                  <Form.Control
                    type="number"
                    name="ac_amplitude"
                    value={params.ac_amplitude || ""}
                    onChange={handleChange}
                    style={{ width: "100px" }}
                  />
                </Form>

                <Form className="d-flex align-items-center me-2">
                  <Form.Label className="me-1 mb-0">Frequência AC:</Form.Label>
                  <Form.Control
                    type="number"
                    name="ac_frequency"
                    value={params.ac_frequency || ""}
                    onChange={handleChange}
                    style={{ width: "100px" }}
                  />
                </Form>
              </>
            )}

            {/* Dropdown para escolher o tipo de fonte */}
            <NavDropdown title={fonteTitle} id="navbarScrollingDropdown">
              <NavDropdown.Item
                onClick={() =>
                  handleChange({ target: { name: "source_type", value: "DC" } })
                }
              >
                Corrente Contínua
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() =>
                  handleChange({ target: { name: "source_type", value: "AC" } })
                }
              >
                Corrente Alternada
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Botão Simular */}
          <Button variant="primary" onClick={handleSimulate}>
            Simular
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;