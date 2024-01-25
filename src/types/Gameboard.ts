import { BOARD_SIZE } from "../utils/configs";
import { AttackResult } from "./AttackResult";
import { Cell } from "./Cell";
import { Ship } from "./Ship";

export interface IGameboard {
  placeShip(ship: Ship, row: number, col: number, horizontal: boolean): boolean;
  handleAttack(row: number, col: number): AttackResult;
}

export class Gameboard implements IGameboard {
  private cells: Cell[][];
  private width: number;
  private height: number;

  constructor(size: number) {
    this.width = size;
    this.height = size;
    this.cells = Array.from({ length: BOARD_SIZE }, () =>
      Array.from({ length: BOARD_SIZE }, () => new Cell()),
    );
  }

  getBoardCells() {
    return this.cells;
  }

  //Places a ship on the board if coordinates are valid
  placeShip(
    ship: Ship,
    row: number,
    col: number,
    horizontal: boolean,
  ): boolean {
    if (!this.isValidPlacement(row, col, ship.length, horizontal)) {
      return false;
    }
    for (let i = 0; i < ship.length; i++) {
      const x = horizontal ? col + i : col;
      const y = horizontal ? row : row + i;
      this.cells[y][x].placeShip(ship);
    }
    return true;
  }

  handleAttack(row: number, col: number): AttackResult {
    if (this.isOutOfBounds(row, col)) {
      return AttackResult.invalid("Invalid attack coordinates");
    }
    return this.cells[row][col].handleAttack();
  }

  private isValidPlacement(
    startY: number,
    startX: number,
    length: number,
    horizontal: boolean,
  ): boolean {
    if (horizontal) {
      // Horizontal placement
      if (startX + length > this.cells[0].length) {
        return false; // Out of bounds
      }
      for (let i = startX; i < startX + length; i++) {
        if (!this.cells[startY][i].isEmpty()) {
          return false; // Cell is not empty
        }
      }
    } else {
      // Vertical placement
      if (startY + length > this.cells.length) {
        return false; // Out of bounds
      }
      for (let i = startY; i < startY + length; i++) {
        if (!this.cells[i][startX].isEmpty()) {
          return false; // Cell is not empty
        }
      }
    }
    return true;
  }

  private isOutOfBounds(x: number, y: number): boolean {
    return x < 0 || x >= this.width || y < 0 || y >= this.height;
  }
}
