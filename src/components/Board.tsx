import { FunctionComponent, useState } from "react";
import BoardCell from "./BoardCell";

import { Player } from "../types/Player";
import { CellState } from "../types/CellState";
import Grid from "./Grid";
import { BOARD_SIZE, BoardOwner, GamePhase } from "../utils/configs";

interface BoardProps {
  gamePhase: GamePhase;
  player: Player;
  onCellClick: (row: number, col: number) => void;
  showShips: boolean;
  owner: BoardOwner;
}

interface CellStyles {
  EmptyState: () => string;
  ShipState: (showShips: boolean) => string;
  HitState: () => string;
  MissState: () => string;
  Default: () => string;
}

const cellStyles: CellStyles = {
  EmptyState: () => "empty-cell",
  ShipState: (showShips: boolean) => (showShips ? "ship-cell" : "empty-cell"),
  HitState: () => "hit-cell",
  MissState: () => "miss-cell",
  Default: () => "unknown-cell",
};

const getCellStyle = (cellState: CellState, showShips: boolean): string => {
  const cellType = cellState.constructor.name;
  const styleFunc = (cellStyles as any)[cellType] || cellStyles.Default;
  return styleFunc(showShips);
};

const boardStyle = {
  "--board-rows": BOARD_SIZE,
  "--board-columns": BOARD_SIZE,
} as React.CSSProperties;

const Board: FunctionComponent<BoardProps> = ({
  gamePhase,
  player,
  onCellClick,
  showShips,
  owner,
}) => {
  const [cells, setCells] = useState(player.getBoard().getBoardCells());
  const handleClick = (row: number, col: number) => {
    onCellClick(row, col);
    setCells([...player.getBoard().getBoardCells()]);
  };

  return (
    <div className="content-board">
      <div className="content-board-wrapper">
        <h1>{owner}'s Board</h1>
        <div className="content-board-container">
          <Grid direction="row" />
          <Grid direction="column" />
        </div>
        <div
          className={`board ${
            gamePhase !== "placeShip" && owner == BoardOwner.Player
              ? "disable-block"
              : ""
          }`}
          style={boardStyle}
        >
          {player.board.getBoardCells().map((row, rowIndex: number) => {
            return row.map((cell, columnIndex: number) => {
              const cellStyle = getCellStyle(cell.state, showShips);
              return (
                <BoardCell
                  divId={`cell_${rowIndex}_${columnIndex}`}
                  row={rowIndex}
                  col={columnIndex}
                  cellStyle={cellStyle}
                  onClick={handleClick}
                  key={`cell_${rowIndex}_${columnIndex}`}
                />
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default Board;
