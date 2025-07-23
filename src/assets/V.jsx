import { Circle, Text, Group } from "react-konva";

function ShapeV({ x, y }) {
  return (
    <Group>
      <Circle x={x} y={y} radius={50} stroke="black" strokeWidth={4} />
      <Text
        x={x - 10}
        y={y - 20}
        text="+"
        fontSize={24}
        fontStyle="bold"
        fill="black"
      />
      <Text
        x={x - 7}
        y={y + 10}
        text="-"
        fontSize={24}
        fontStyle="bold"
        fill="black"
      />
      <Text
        x={x - 100}
        y={y - 10}
        text="V"
        fontSize={24}
        fontStyle="bold"
        fill="black"
      />
    </Group>
  );
}

export default ShapeV;
