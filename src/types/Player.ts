import { BOARD_SIZE, generateShips } from "../utils/configs";
import { AttackResult } from "./AttackResult";
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";

// Player.ts
export abstract class Player {
  board: Gameboard;
  name: string;
  deployableShips: Ship[];
  deployedShips: Ship[] = []; // New array to track deployed ships

  constructor() {
    this.board = new Gameboard(BOARD_SIZE);
    this.deployableShips = generateShips();
    this.name = "Player 1";
  }

  abstract attack(opponent: Player, row?: number, col?: number): AttackResult;

  getBoard(): Gameboard {
    return this.board;
  }

  receiveAttack(row: number, col: number): AttackResult {
    return this.board.handleAttack(row, col);
  }

  protected canAttack(row?: number, col?: number): boolean {
    // Check if the coordinates are within the board bounds
    if (
      row === undefined ||
      row === null ||
      col === undefined ||
      col === null
    ) {
      return false;
    }
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) {
      return false;
    }
    return true;
  }

  placeShip(
    shipToPlace: Ship,
    row: number,
    col: number,
    horizontal: boolean,
  ): boolean {
    const result = this.board.placeShip(shipToPlace, row, col, horizontal);
    if (result) {
      this.deployedShips.push(shipToPlace);
    }
    return result;
  }

  //You may want in the future, add a random button for a Human player too
  randomizeShipsLocation() {
    if (this.deployableShips.length === this.deployedShips.length) {
      console.warn("Ships already deployed");
      return;
    }
    this.deployableShips.forEach((shipToPlace) => {
      let placed = false;

      while (!placed) {
        const startX = Math.floor(Math.random() * BOARD_SIZE);
        const startY = Math.floor(Math.random() * BOARD_SIZE);
        const horizontal = Math.random() > 0.5;

        placed = this.placeShip(shipToPlace, startX, startY, horizontal);
      }
    });
  }

  isDefeated(): boolean {
    return this.deployedShips.every((ship) => ship.isSunk());
  }
}

// HumanPlayer.ts
export class HumanPlayer extends Player {
  constructor(name: string) {
    super();
    this.name = name;
  }

  attack(opponent: Player, row?: number, col?: number): AttackResult {
    if (this.canAttack(row, col)) {
      return opponent.receiveAttack(row!, col!);
    }
    return AttackResult.invalid("Invalid attack coordinates");
  }
}

// SimpleAI.ts
export class SimpleAIPlayer extends Player {
  constructor(name: string) {
    super();
    this.name = name;
  }

  attack(opponent: Player): AttackResult {
    const row = Math.floor(Math.random() * (BOARD_SIZE - 1));
    const col = Math.floor(Math.random() * (BOARD_SIZE - 1));
    return opponent.receiveAttack(row, col);
  }
}
