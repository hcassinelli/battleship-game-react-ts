import { FunctionComponent, useState } from "react";
import { Player } from "../types/Player";
import { Ship } from "../types/Ship";
import Board from "./Board";
import Inventory from "./Inventory";
import { Direction, BoardOwner, GamePhase } from "../utils/configs";

interface PlacementModeProps {
  player: Player;
  onShipsPlaced: () => void;
}

const PlacementMode: FunctionComponent<PlacementModeProps> = ({
  player,
  onShipsPlaced,
}) => {
  const [playersSelectedAxis, setPlayersSelectedAxis] = useState(
    Direction.Horizontal,
  );

  let [availableShips, setAvailableShips] = useState<Ship[]>(
    player.deployableShips,
  );

  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);

  const onSelectAxis = (axis: Direction) => {
    setPlayersSelectedAxis(axis);
  };

  const handleSelectShip = (ship: Ship | null) => {
    setSelectedShip(ship);
  };

  const handleCellClick = (row: number, col: number) => {
    if (!selectedShip) {
      alert("Please select your ship first!!");
      return;
    }

    const isShipPlaced = player.placeShip(
      selectedShip,
      row,
      col,
      playersSelectedAxis === Direction.Horizontal,
    );

    if (!isShipPlaced) {
      alert("Error placing ship!");
      return;
    }
    const newAvailableShips = availableShips.filter(
      (ship) => ship.id !== selectedShip.id,
    );
    setAvailableShips(newAvailableShips);
    setSelectedShip(null);

    if (newAvailableShips.length === 0) {
      onShipsPlaced();
    }
  };

  return (
    <div className="content">
      <Board
        showShips={true}
        player={player}
        gamePhase={GamePhase.PlaceShip}
        onCellClick={handleCellClick}
        owner={BoardOwner.Player}
      />
      <Inventory
        playersSelectedAxis={playersSelectedAxis}
        onSelectDirection={onSelectAxis}
        onSelectShip={handleSelectShip}
        availableShips={availableShips}
      />
    </div>
  );
};

export default PlacementMode;
