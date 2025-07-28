import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Stage, Layer } from "react-konva";
import NavScroll from "./NavScroll";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

function App() {
  const [imgSrc, setImgSrc] = useState(null);
  const [loadingBoolean, setLoadingBoolean] = useState(false);
  const [params, setParams] = useState({
    R: 0,
    L: 0,
    C: 0,
    source_type: "DC",
    dc_voltage: 0,
    ac_amplitude: 0,
    ac_frequency: 0,
    simulation_time_end: 0,
  });

   // Atualiza os params ao mudar o input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simulador de Imagem
  const handleSimulate = async () => {
    setLoadingBoolean(true);
    setImgSrc(null);

    const query = new URLSearchParams();
    query.append("R", params.R);
    query.append("L", params.L);
    query.append("C", params.C);
    query.append("source_type", params.source_type);
    query.append("simulation_time_end", params.simulation_time_end);

    if (params.source_type === "DC") {
      query.append("dc_voltage", params.dc_voltage);
    } else {
      query.append("ac_amplitude", params.ac_amplitude);
      query.append("ac_frequency", params.ac_frequency);
    }

    const url = `http://127.0.0.1:5000/runge_kutta_img?${query.toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        let errorMessage = "Erro desconhecido na simulação da imagem.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (jsonError) {
          errorMessage = `Erro ao simular imagem: ${response.status} ${response.statusText}. Resposta do servidor não é JSON.`;
          console.error("Erro ao parsear JSON da resposta de erro da imagem:", jsonError);
        }
        alert(errorMessage);
        return;
      }
      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      setImgSrc(imageObjectURL);
    } catch (err) {
      alert("Erro na comunicação com o servidor ao simular imagem: " + err.message);
    } finally {
      setLoadingBoolean(false);
    }
  };

  // Download CSV
  const handleDownloadCSV = async () => {
    setLoadingBoolean(true);
    setImgSrc(null); // Limpa a imagem, pois o foco é o download do CSV

    const query = new URLSearchParams();
    query.append("R", params.R);
    query.append("L", params.L);
    query.append("C", params.C);
    query.append("source_type", params.source_type);
    query.append("simulation_time_end", params.simulation_time_end);

    if (params.source_type === "DC") {
      query.append("dc_voltage", params.dc_voltage);
    } else {
      query.append("ac_amplitude", params.ac_amplitude);
      query.append("ac_frequency", params.ac_frequency);
    }

    const csvUrl = `http://127.0.0.1:5000/runge_kutta_csv?${query.toString()}`;

    try {
      const response = await fetch(csvUrl);
      if (!response.ok) {
        let errorMessage = "Erro desconhecido ao baixar o CSV.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (jsonError) {
          // Se a resposta não for JSON, tente ler como texto
          const textError = await response.text();
          errorMessage = `Erro ao baixar CSV: ${response.status} ${response.statusText}. Detalhes: ${textError.substring(0, 100)}...`;
          console.error("Erro ao parsear JSON da resposta de erro do CSV:", jsonError);
          console.error("Resposta de erro completa do CSV (se disponível):", textError);
        }
        alert(errorMessage);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'runge_kutta.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (err) {
      alert("Erro na comunicação com o servidor ao baixar CSV: " + err.message);
    } finally {
      setLoadingBoolean(false);
    }
  };

  const fonteTitle =
    params.source_type === "DC"
      ? "Corrente Contínua"
      : params.source_type === "AC"
      ? "Corrente Alternada"
      : "Fonte de Corrente";

  return (
    <>
      {/* A barra de navegação superior com o título */}
      <NavScroll />

      {/* Conteúdo principal: inputs e botões à esquerda, imagem/GIF à direita */}
      <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
        {/* Coluna da Esquerda: Campos de Input e Botões */}
        <div style={{ flex: 1, minWidth: "300px", maxWidth: "400px" }}>
          <h4 className="mb-3">Parâmetros do Circuito</h4>
          
          <Form className="mb-3">
            <Form.Label className="mb-1">Tempo da simulação em segundos:</Form.Label>
            <Form.Control
              type="number"
              name="simulation_time_end"
              value={params.simulation_time_end}
              onChange={handleChange}
              placeholder="Ex: 20"
            />
          </Form>

          <Form className="mb-3">
            <Form.Label className="mb-1">Resistência (R):</Form.Label>
            <Form.Control
              type="number"
              name="R"
              value={params.R}
              onChange={handleChange}
              placeholder="Ohms"
            />
          </Form>

          <Form className="mb-3">
            <Form.Label className="mb-1">Indutância (L):</Form.Label>
            <Form.Control
              type="number"
              name="L"
              value={params.L}
              onChange={handleChange}
              placeholder="Henrys"
            />
          </Form>

          <Form className="mb-3">
            <Form.Label className="mb-1">Capacitância (C):</Form.Label>
            <Form.Control
              type="number"
              name="C"
              value={params.C}
              onChange={handleChange}
              placeholder="Farads"
            />
          </Form>

          {/* Dropdown para escolher o tipo de fonte */}
          <Form className="mb-3">
            <Form.Label className="mb-1">Tipo de Fonte:</Form.Label>
            <NavDropdown title={fonteTitle} id="sourceTypeDropdown" className="w-100">
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
          </Form>

          {/* CAMPOS DINÂMICOS DEPENDENDO DO TIPO DE FONTE */}
          {params.source_type === "DC" && (
            <Form className="mb-3">
              <Form.Label className="mb-1">Tensão DC:</Form.Label>
              <Form.Control
                type="number"
                name="dc_voltage"
                value={params.dc_voltage || ""}
                onChange={handleChange}
                placeholder="Volts"
              />
            </Form>
          )}

          {params.source_type === "AC" && (
            <>
              <Form className="mb-3">
                <Form.Label className="mb-1">Amplitude AC:</Form.Label>
                <Form.Control
                  type="number"
                  name="ac_amplitude"
                  value={params.ac_amplitude || ""}
                  onChange={handleChange}
                  placeholder="Volts"
                />
              </Form>

              <Form className="mb-3">
                <Form.Label className="mb-1">Frequência AC:</Form.Label>
                <Form.Control
                  type="number"
                  name="ac_frequency"
                  value={params.ac_frequency || ""}
                  onChange={handleChange}
                  placeholder="Hz"
                />
              </Form>
            </>
          )}

          {/* Botões de Ação na Coluna Lateral */}
          <div className="d-flex mt-4">
            <Button variant="primary" onClick={handleSimulate} className="me-2">
              Simular
            </Button>
            <Button variant="success" onClick={handleDownloadCSV}>
              Baixar CSV
            </Button>
          </div>
        </div>

        {/* Coluna da Direita: Imagem da Simulação / GIF de Carregamento */}
        <div style={{
          flex: 2,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "calc(100vh - 100px)",
          border: "1px dashed #ccc",
          padding: "10px"
        }}>
          {loadingBoolean ? (
            <>
              <img src="/public/loading.gif" alt="Carregando..." style={{ width: "200px", height: "200px" }} />
              <p>Gerando a simulação...</p>
            </>
          ) : (
            imgSrc && (
              <img
                src={imgSrc}
                alt="Simulação Corrente vs Tempo"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  border: "2px solid red"
                }}
              />
            )
          )}
          {!loadingBoolean && !imgSrc && (
            <p>Insira os parâmetros e clique em "Simular" ou "Baixar CSV".</p>
          )}
        </div>
      </div>

      {/* Konva Stage e Layer permanecem aqui, mas não estão renderizando elementos visíveis no momento */}
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
        </Layer>
      </Stage>
    </>
  );
}

export default App;
