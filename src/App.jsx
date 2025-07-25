import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Stage, Layer, Rect, Circle, Text, Line } from "react-konva";
import NavScroll from "./NavScroll";
import ShapeR from "./assets/R";
import ShapeL from "./assets/L";
import ShapeC from "./assets/C";
import ShapeV from "./assets/V";

function App() {
  const [imgSrc, setImgSrc] = useState(null);
  const [params, setParams] = useState({
    R: 0,
    L: 0,
    C: 0,
    source_type: "DC",
    dc_voltage: 0,
    ac_amplitude: 0,
    ac_frequency: 0,
  });

   // Atualiza os params ao mudar o input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simulador
  const handleSimulate = async () => {
    // Monta a query string para a URL da API
    const query = new URLSearchParams();

    query.append("R", params.R);
    query.append("L", params.L);
    query.append("C", params.C);
    query.append("source_type", params.source_type);

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
        const errorData = await response.json();
        alert("Erro na simulação: " + (errorData.error || "Erro desconhecido"));
        return;
      }
      // Pega o blob da imagem PNG
      const blob = await response.blob();
      // Cria URL local para a imagem
      const imageObjectURL = URL.createObjectURL(blob);
      setImgSrc(imageObjectURL);
    } catch (err) {
      alert("Erro na comunicação com o servidor: " + err.message);
    }
  };

  return (
    <>
      <NavScroll 
        params={params}
        handleChange={handleChange}
        handleSimulate={handleSimulate}
      />

      {/* Mostra a imagem da simulação */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {imgSrc && (
          <img
            src={imgSrc}
            alt="Simulação Corrente vs Tempo"
            style={{
              maxWidth: "90vw",
              maxHeight: "70vh",
              border: "2px solid red"
          }}
        />
      )}

      </div>

      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
        </Layer>
      </Stage>
    </>
  );
}

export default App;
