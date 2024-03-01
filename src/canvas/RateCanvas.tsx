import React from "react";
import { Stage, Layer, Arc } from "react-konva";
import styles from "./rateCanvas.module.scss";

type Props = {
  vote_average: number;
  size: number;
};

const RateCanvas = ({ vote_average, size }: Props) => {
  const width = size;
  const height = size;
  const angle = 360 * (Math.round(vote_average * 10) / 100);
  const colorObj = {
    "#1cc2b5": "rgb(28, 206, 181, 0.3)",
    "#d2d532": "rgb(210, 213, 50, 0.3)",
    "#e94a4a": "rgb(233, 74, 74, 0.3)",
  };

  const checkColor = () => {
    if (vote_average > 7) {
      return "#1cc2b5";
    } else if (vote_average > 3) {
      return "#d2d532";
    } else {
      return "#e94a4a";
    }
  };
  return (
    <div className={styles.canvas}>
      <Stage width={width} height={height}>
        <Layer>
          <Arc
            x={width / 2}
            y={width / 2}
            innerRadius={width / 2 - 3.5}
            outerRadius={width / 2}
            angle={360}
            fill={colorObj[checkColor()]}
            stroke=""
            strokeWidth={0}
          />
          <Arc
            x={width / 2}
            y={width / 2}
            innerRadius={width / 2 - 3.5}
            outerRadius={width / 2}
            angle={angle}
            fill={checkColor()}
            stroke="black"
            strokeWidth={0}
            rotation={-90}
          />
        </Layer>
      </Stage>
      <div className={`${styles.rate} ${size > 40 && styles.rate2}`}>
        {Math.round(vote_average * 10)}%
      </div>
    </div>
  );
};

export default RateCanvas;
