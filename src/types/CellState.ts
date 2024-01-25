import { AttackResult } from "./AttackResult";
import { Cell } from "./Cell";

export abstract class CellState {
  abstract handleAttack(cell: Cell): AttackResult;
  abstract canBeAttacked(): boolean;
  abstract isEmpty(): boolean;
}

export class EmptyState extends CellState {
  handleAttack(cell: Cell): AttackResult {
    cell.state = new MissState();
    return new AttackResult(false);
  }

  canBeAttacked(): boolean {
    return true;
  }

  isEmpty(): boolean {
    return true;
  }
}

export class ShipState extends CellState {
  handleAttack(cell: Cell): AttackResult {
    // Check if the cell is valid
    if (!cell) {
      throw new Error("Cell is null or undefined.");
    }

    // Update the cell state to HitState
    cell.state = new HitState();

    // Check if the cell contains a ship and process the attack
    if (cell.ship) {
      cell.ship.hit();
      const sunk = cell.ship.isSunk();
      return new AttackResult(true, sunk, cell.ship);
    }

    // In case the ship is not present (which should not happen in ShipState), handle accordingly
    throw new Error("Ship should be present");
  }
  canBeAttacked(): boolean {
    return true;
  }
  isEmpty(): boolean {
    return false;
  }
}

export class HitState extends CellState {
  handleAttack(cell: Cell): AttackResult {
    // Already hit; logic for handling this scenario
    // Might be an error or just a no-op
    return AttackResult.invalid("Already hit");
  }
  canBeAttacked(): boolean {
    return false;
  }

  isEmpty(): boolean {
    return false;
  }
}

export class MissState extends CellState {
  handleAttack(cell: Cell): AttackResult {
    // Already a miss; similar logic as for HitState
    return AttackResult.invalid("Already missed it");
  }
  canBeAttacked(): boolean {
    return false;
  }
  isEmpty(): boolean {
    return false;
  }
}
