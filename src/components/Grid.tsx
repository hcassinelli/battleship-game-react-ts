import React from "react";
import GridItem from "./GridItem";
import { BOARD_SIZE } from "../utils/configs";
//import './../index.css';
interface GridProps {
  direction: "row" | "column"; // Specify the allowed directions
}

const Grid: React.FC<GridProps> = ({ direction }) => {
  const getLabels = (direction: "row" | "column") => {
    if (direction === "row") {
      return Array.from({ length: BOARD_SIZE }, (_, i) => (i + 1).toString());
    } else {
      // Generate letter labels for columns (e.g., 'A', 'B', 'C', ...)
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
