import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";
import { BOARD_SIZE } from "../utils/configs";

describe("Gameboard Class", () => {
  let gameboard: Gameboard;

  beforeEach(() => {
    gameboard = new Gameboard(BOARD_SIZE);
  });

  test("should create an empty board", () => {
    expect(
      gameboard
        .getBoardCells()
        .flat()
        .every((cell) => cell.isEmpty()),
    ).toBeTruthy();
  });

  test("should place and attack ship correctly", () => {
    const ship = new Ship("cruiser", 3);
    const placed = gameboard.placeShip(ship, 0, 0, true);
    expect(placed).toBeTruthy();

    const attackResult = gameboard.handleAttack(0, 0);
    expect(attackResult.hit).toBeTruthy();
  });

  // Additional tests...
});
