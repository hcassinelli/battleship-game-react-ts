import { Ship } from "../types/Ship";

export const BOARD_SIZE = 10;

export function generateShips(): Ship[] {
  return [
    new Ship("A", 5),
    new Ship("B", 4),
    new Ship("C", 3),
    new Ship("D", 3),
  ];
}

export enum BoardOwner {
  Player = "Player",
  Opponent = "Opponent",
}

export enum Direction {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

export enum GamePhase {
  PlaceShip = "placeShip",
  Game = "game",
  GameOver = "gameOver",
}
