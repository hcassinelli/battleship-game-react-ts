import React, { useEffect, useState } from "react";
import Board from "./Board";
import { Player } from "../types/Player";
import { BoardOwner, GamePhase } from "../utils/configs";

interface GameModeProps {
  onGameEnd: (winner: string) => void;
  player: Player;
  opponent: Player;
}

const GameMode: React.FC<GameModeProps> = ({ onGameEnd, player, opponent }) => {
  const [playerBoard, setPlayerBoard] = useState(
    player.getBoard().getBoardCells(),
  );
  const [opponentBoard, setOpponentBoard] = useState(
    opponent.board.getBoardCells(),
  );

  const handleGameClick = (row: number, col: number) => {
    try {
      const result = player.attack(opponent, row, col);
      if (!result.isValid) {
        alert(result.message);
        return;
      }

      if (opponent.isDefeated()) {
        onGameEnd(player.name);
        return;
      }

      let aiResult;
      do {
        aiResult = opponent.attack(player);
      } while (!aiResult.isValid);

      if (player.isDefeated()) {
        onGameEnd(opponent.name);
        return;
      }
      //Update boards
      setOpponentBoard([...opponent.getBoard().getBoardCells()]);
      setPlayerBoard([...player.getBoard().getBoardCells()]);
    } catch (error) {
      alert("Ups! Something wrong happened.. please retry");
    }
  };

  return (
    <div className="content">
      <Board
        player={player}
        gamePhase={GamePhase.Game}
        showShips={true}
        onCellClick={() => {}} // No se hace nada en clics para el tablero humano
        owner={BoardOwner.Player}
      />

      <Board
        player={opponent}
        onCellClick={handleGameClick}
        showShips={false}
        gamePhase={GamePhase.Game}
        owner={BoardOwner.Opponent}
      />
    </div>
  );
};

export default GameMode;
