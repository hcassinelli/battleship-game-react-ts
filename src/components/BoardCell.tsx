import React, { useState } from "react";
interface BoardSquareProps {
  // Define any props you may need for the GameOver component
  divId: string;
  row: number; // Add rowIndex prop
  col: number; // Add columnIndex prop
  cellStyle: string;
  onClick: (row: number, col: number) => void;
}

const BoardCell: React.FC<BoardSquareProps> = ({
  divId,
  row,
  col,
  onClick,
  cellStyle,
}) => {
  //  logic and state
  // Implement your game over screen, winner detection, and UI here

  return (
    <div
      id={divId}
      onClick={() => onClick(row, col)}
      //disabled={isShipSunk || isAttacked || missBlock}
      className={`board-square ${cellStyle}`}
    ></div>
  );
};

export default BoardCell;
