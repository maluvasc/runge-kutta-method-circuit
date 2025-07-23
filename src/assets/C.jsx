import { Shape } from "react-konva";

function ShapeC({ x, y }) {
  const plateLength = 20;
  const plateGap = 10;

  return (
    <>
        <Line
          points={[x, y - 30, x, y - plateLength]}
          stroke="black"
          strokeWidth={2}
        />
        <Line
          points={[x - 10, y - plateLength, x + 10, y - plateLength]}
          stroke="black"
          strokeWidth={2}
        />
        <Line
          points={[
            x - 10,
            y - plateLength - plateGap,
            x + 10,
            y - plateLength - plateGap,
          ]}
          stroke="black"
          strokeWidth={2}
        />
        <Line
          points={[
            x,
            y - plateLength - plateGap,
            x,
            y - plateLength - plateGap - 30,
          ]}
          stroke="black"
          strokeWidth={2}
        />
    </>
  );
}

export default ShapeC;
