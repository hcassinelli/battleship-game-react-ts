import { Cell } from "./Cell";
import { Ship } from "./Ship";
import { EmptyState, MissState, ShipState } from "./CellState";
import { AttackResult } from "./AttackResult";

describe("Cell Class", () => {
  let cell: Cell;
  let ship: Ship;

  beforeEach(() => {
    cell = new Cell();
    ship = new Ship("destroyer", 2);
  });

  test("should initialize with EmptyState and no ship", () => {
    expect(cell.state).toBeInstanceOf(EmptyState);
    expect(cell.ship).toBeNull();
    expect(cell.isEmpty()).toBeTruthy();
  });

  test("should place a ship and update state to ShipState", () => {
    cell.placeShip(ship);
    expect(cell.ship).toBe(ship);
    expect(cell.state).toBeInstanceOf(ShipState);
    expect(cell.isEmpty()).toBeFalsy();
  });

  test("should return correct attack result when attacked", () => {
    cell.placeShip(ship);
    const attackResult = cell.handleAttack();
    expect(attackResult.hit).toBeTruthy();
    expect(attackResult.ship).toBe(ship);
  });

  test("should return false for canBeAttacked if cell already hit", () => {
    cell.placeShip(ship);
    cell.handleAttack(); // First attack
    expect(cell.canBeAttacked()).toBeFalsy();
  });

  test("should return true for canBeAttacked if cell not hit", () => {
    cell.placeShip(ship);
    expect(cell.canBeAttacked()).toBeTruthy();
  });

  test("should handle attack correctly and change state on hit", () => {
    cell.placeShip(ship);
    const attackResult = cell.handleAttack();
    expect(attackResult.hit).toBeTruthy();
    expect(ship.hits).toBe(1);
  });

  test("should handle attack correctly and change state to MissState if missed", () => {
    const attackResult = cell.handleAttack(); // No ship placed
    expect(attackResult.hit).toBeFalsy();
    expect(cell.state).toBeInstanceOf(MissState);
  });
});
