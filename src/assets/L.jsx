import React from "react";
import { Stage, Layer, Shape } from "react-konva";

function ShapeL({ x, y, height, width }) {
  return (
    <Shape
      sceneFunc={(context, shape) => {
        const segmentHeight = height / 4;
        context.beginPath();
        context.moveTo(x, y); // Ponto inicial na esquerda

        for (let i = 0; i < 4; i++) {
          const startY = y + i * segmentHeight;
          const cp1x = x + width; // control point 1 à direita
          const cp2x = x + width; // control point 2 à direita
          const endY = startY + segmentHeight;

          context.bezierCurveTo(
            cp1x,
            startY + segmentHeight / 3,
            cp2x,
            startY + (2 * segmentHeight) / 3,
            x,
            endY
          );
        }

        context.strokeShape(shape);
      }}
      stroke="black"
      strokeWidth={4}
    />
  );
}

export default ShapeL;
