import { AttackResult } from "./AttackResult";
import { CellState, EmptyState, ShipState } from "./CellState";
import { Ship } from "./Ship";

export class Cell {
  state: CellState;
  ship: Ship | null;

  constructor() {
    this.state = new EmptyState();
    this.ship = null;
  }

  placeShip(ship: Ship) {
    this.ship = ship;
    this.state = new ShipState();
  }

  canBeAttacked(): boolean {
    return this.state.canBeAttacked();
  }

  handleAttack(): AttackResult {
    return this.state.handleAttack(this);
  }
  isEmpty(): boolean {
    return this.state.isEmpty();
  }
}
