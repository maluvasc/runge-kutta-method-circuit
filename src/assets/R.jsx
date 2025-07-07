import { Shape } from "react-konva";

function ShapeR(props) {
  return (
    <>
        <Shape
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(10, 50);
            context.lineTo(20, 40);
            context.lineTo(30, 60);
            context.lineTo(40, 40);
            context.lineTo(50, 60);
            context.lineTo(60, 40);
            context.lineTo(70, 50);
            context.fillStrokeShape(shape);
          }}
          stroke="black"
          strokeWidth={4}
          rotation={90}
          {...props}        
        />
     </>
  );
}

export default ShapeR;
