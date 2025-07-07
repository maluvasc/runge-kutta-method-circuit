import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Stage, Layer, Rect, Circle, Text } from "react-konva";
import NavScroll from "./NavScroll";
import ShapeR from "./assets/R";

function App() {
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [shapeRPos, setShapeRPos] = useState({ x: 550, y: 300 });
  return (
    <>
      <NavScroll />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Rect
            x={position.x}
            y={position.y}
            width={300}
            height={500}
            fill=""
            stroke="black"
            strokeWidth={4}
            onMouseEnter={() => (document.body.style.cursor = "pointer")}
            onMouseLeave={() => (document.body.style.cursor = "default")}
            onDragEnd={(e) => {
              setPosition({ x: e.target.x(), y: e.target.y() });
            }}
          />
          <ShapeR
            x={shapeRPos.x}
            y={shapeRPos.y}
            onMouseEnter={() => (document.body.style.cursor = "pointer")}
            onMouseLeave={() => (document.body.style.cursor = "default")}
            onDragEnd={(e) => {
              setShapeRPos({ x: e.target.x(), y: e.target.y() });
            }}
          />
          <Text
            x={shapeRPos.x - 20}
            y={shapeRPos.y + 30}
            text="R"
            fontSize={20}
            fontStyle="bold"
            fill="black"
          />
        </Layer>
      </Stage>
    </>
  );
}

export default App;