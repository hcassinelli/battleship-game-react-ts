import React from "react";
import GridItem from "./GridItem";
import { BOARD_SIZE } from "../utils/configs";
interface GridProps {
  direction: "row" | "column";
}

const Grid: React.FC<GridProps> = ({ direction }) => {
  const getLabels = (direction: "row" | "column") => {
    if (direction === "row") {
      return Array.from({ length: BOARD_SIZE }, (_, i) => (i + 1).toString());
    } else {
      return Array.from({ length: BOARD_SIZE }, (_, i) =>
        String.fromCharCode(65 + i),
      );
    }
  };

  return (
    <div className={`grid ${direction}`}>
      {getLabels(direction).map((label, index) => {
        return <GridItem key={`grid_label_${label}`} label={label} />;
      })}
    </div>
  );
};

export default Grid;
