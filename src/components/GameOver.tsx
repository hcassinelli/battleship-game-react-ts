import React from "react";

interface GameOverProps {
  winner: string;
  onReset: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ winner, onReset }) => {
  return (
    <div className="game-over">
      <div className="game-over-content">
        <h1 className="game-over-title">Game Over</h1>
        <p className="winner-message">{winner} has won!</p>
        <button className="reset-button" onClick={onReset}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
