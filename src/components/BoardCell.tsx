import React, { useState } from "react";
interface BoardSquareProps {
  divId: string;
  row: number;
  col: number;
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
  return (
    <div
      id={divId}
      onClick={() => onClick(row, col)}
      className={`board-square ${cellStyle}`}
    ></div>
  );
};

export default BoardCell;
