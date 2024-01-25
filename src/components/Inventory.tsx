import React, { useState } from "react";
import { Ship } from "../types/Ship";
import { Direction } from "../utils/configs";

interface PlaceShipProps {
  //changePhase: (newPhase: string) => void;
  playersSelectedAxis: Direction;
  onSelectDirection: (direction: Direction) => void;
  onSelectShip: (ship: Ship) => void;
  availableShips: Ship[];
}

const Inventory: React.FC<PlaceShipProps> = ({
  playersSelectedAxis: SelectedDirection,
  onSelectDirection: onSelectDirection,
  onSelectShip,
  availableShips,
}) => {
  // State to manage ship placement logic
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);

  return (
    <div className="content-board">
      <div className="inventory">
        <div className="inventory-title">Deploy your Ships</div>
        <div className="inventory-content">
          <div className="inventory-grid">
            <button
              className={
                SelectedDirection === Direction.Horizontal ? "selected" : ""
              }
              onClick={() => onSelectDirection(Direction.Horizontal)}
            >
              Horizontal
            </button>
            <button
              className={
                SelectedDirection === Direction.Vertical ? "selected" : ""
              }
              onClick={() => onSelectDirection(Direction.Vertical)}
            >
              Vertical
            </button>
          </div>
          {/* Iterate over the player's available ships */}
          {availableShips.map((ship) => (
            <div
              key={ship.id}
              id={ship.id}
              className={`inventory-item ${
                selectedShip && selectedShip.id === ship.id ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedShip(ship); // Al hacer clic, establece el barco seleccionado
                onSelectShip(ship); // Llama a la función externa para manejar la selección del barco
              }}
            >
              <span className="inventory-item-name"> {ship.id} </span>
              <div>{ship.length}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
