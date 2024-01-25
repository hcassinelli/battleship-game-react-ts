import React, { useState } from "react";
import { Ship } from "../types/Ship";
import { Direction } from "../utils/configs";

interface PlaceShipProps {
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

          {availableShips.map((ship) => (
            <div
              key={ship.id}
              id={ship.id}
              className={`inventory-item ${
                selectedShip && selectedShip.id === ship.id ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedShip(ship);
                onSelectShip(ship);
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
