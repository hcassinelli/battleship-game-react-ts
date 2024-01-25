import { useEffect, useState } from "react";
import GameMode from "./components/GameMode";
import GameOver from "./components/GameOver";
import { HumanPlayer, Player, SimpleAIPlayer } from "./types/Player";
import PlacementMode from "./components/PlacementMode";
import Title from "./components/Title";
import "./index.css";
import { GamePhase } from "./utils/configs";

function App() {
  // State to track the current phase of the game
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.PlaceShip); // Default to 'placeShip'
  const [winner, setWinner] = useState<string | null>(null);

  // Instantiate Players
  const [player, setPlayer] = useState<Player>(new HumanPlayer("Player 1"));
  const [opponent, setOpponent] = useState<Player>(
    new SimpleAIPlayer("Terminator"),
  );

  useEffect(() => {
    if (gamePhase === GamePhase.Game) {
      opponent.randomizeShipsLocation();
    }
  }, [gamePhase, opponent]);

  // Function to change the game phase
  const finishShipPlacement = () => {
    setGamePhase(GamePhase.Game);
  };

  const finishGame = (winner: string) => {
    setWinner(winner);
    setGamePhase(GamePhase.GameOver);
  };

  const resetGame = () => {
    // Reset the game phase to the ship placement phase
    setGamePhase(GamePhase.PlaceShip);
    // Reset the winner to null
    setWinner(null);
    setPlayer(new HumanPlayer("Player 1"));
    setOpponent(new SimpleAIPlayer("Terminator"));
  };

  let content;
  switch (gamePhase) {
    case GamePhase.PlaceShip:
      content = (
        <PlacementMode
          gamePhase={gamePhase}
          player={player}
          onShipsPlaced={finishShipPlacement}
        />
      );
      break;
    case GamePhase.Game:
      content = (
        <GameMode onGameEnd={finishGame} player={player} opponent={opponent} />
      );
      break;
    case GamePhase.GameOver:
      content = winner ? (
        <GameOver winner={winner} onReset={resetGame} />
      ) : (
        <p>Error: No winner</p>
      );
      break;
    default:
      content = <p>Something happened... please restart game</p>;
  }

  return (
    <div className="stage">
      <Title />
      {content}
    </div>
  );
}
App.displayName = "Battleship";
export default App;
