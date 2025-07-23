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
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [shapeRPos, setShapeRPos] = useState({ x: 550, y: 250 });
  const [shapeLPos, setShapeLPos] = useState({ x: 500, y: 400 });
  const [shapeCPos, setShapeCPos] = useState({ x: 500, y: 580 });
  const plateLength = 20;
  const plateGap = 10;
  return (
    <>
      <NavScroll />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Line
            points={[position.x, position.y, position.x + 300, position.y]}
            stroke="black"
            strokeWidth={4}
          />
          <Line
            points={[position.x, position.y, position.x, position.y + 200]}
            stroke="black"
            strokeWidth={4}
          />
          <Line
            points={[position.x, position.y + 300, position.x, position.y + 500]}
            stroke="black"
            strokeWidth={4}
          />
          <Line
            points={[
              position.x + 300,
              position.y + 500,
              position.x,
              position.y + 500,
            ]}
            stroke="black"
            strokeWidth={4}
          />
          <Line
            points={[
              position.x + 300,
              position.y,
              position.x + 300,
              position.y + 60,
            ]}
            stroke="black"
            strokeWidth={4}
          />
          <Line
            points={[
              position.x + 300,
              position.y + 120,
              position.x + 300,
              position.y + 200,
            ]}
            stroke="black"
            strokeWidth={4}
          />
          <Line
            points={[
              position.x + 300,
              position.y + 280,
              position.x + 300,
              position.y + 360,
            ]}
            stroke="black"
            strokeWidth={4}
          />
          <ShapeR x={shapeRPos.x} y={shapeRPos.y} />
          <Text
            x={shapeRPos.x - 20}
            y={shapeRPos.y + 30}
            text="R"
            fontSize={20}
            fontStyle="bold"
            fill="black"
          />
          <ShapeL
            x={shapeLPos.x}
            y={shapeLPos.y}
            height={80}
            width={20}
            onMouseEnter={() => (document.body.style.cursor = "pointer")}
            onMouseLeave={() => (document.body.style.cursor = "default")}
          />
          <Text
            x={shapeLPos.x + 30}
            y={shapeLPos.y + 30}
            text="L"
            fontSize={20}
            fontStyle="bold"
            fill="black"
          />
          <Line
            points={[
              shapeCPos.x,
              shapeCPos.y - 30,
              shapeCPos.x,
              shapeCPos.y - plateLength,
            ]}
            stroke="black"
            strokeWidth={4}
          />
          <Line
            points={[
              shapeCPos.x - 20,
              shapeCPos.y - plateLength,
              shapeCPos.x + 20,
              shapeCPos.y - plateLength,
            ]}
            stroke="black"
            strokeWidth={4}
          />
          <Line
            points={[
              shapeCPos.x - 20,
              shapeCPos.y + 20 - plateLength,
              shapeCPos.x + 20,
              shapeCPos.y + 20 - plateLength,
            ]}
            stroke="black"
            strokeWidth={4}
          />
          <Line
            points={[
              position.x + 300,
              position.y + 380,
              position.x + 300,
              position.y + 500,
            ]}
            stroke="black"
            strokeWidth={4}
          />
          <Text
            x={shapeCPos.x + 30}
            y={shapeCPos.y - 15}
            text="C"
            fontSize={20}
            fontStyle="bold"
            fill="black"
          />
          <ShapeV x={200} y={450} />
        </Layer>
      </Stage>
    </>
  );
}

export default App;
