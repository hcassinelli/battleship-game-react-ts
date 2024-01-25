import { Cell } from "./Cell";
import { Ship } from "./Ship";
import { EmptyState, ShipState, HitState, MissState } from "./CellState";
import { AttackResult } from "./AttackResult";

describe("CellState Classes", () => {
  let cell: Cell;
  let ship: Ship;

  beforeEach(() => {
    cell = new Cell();
    ship = new Ship("battleship", 4);
  });

  // Testing EmptyState
  describe("EmptyState", () => {
    test("should handle attack and transition to MissState", () => {
      cell.state = new EmptyState();
      const result = cell.handleAttack();
      expect(result.hit).toBeFalsy();
      expect(cell.state).toBeInstanceOf(MissState);
    });

    test("should be attackable and empty", () => {
      cell.state = new EmptyState();
      expect(cell.canBeAttacked()).toBeTruthy();
      expect(cell.isEmpty()).toBeTruthy();
    });
  });

  // Testing ShipState
  describe("ShipState", () => {
    beforeEach(() => {
      cell.placeShip(ship);
    });

    test("should handle attack and transition to HitState", () => {
      const result = cell.handleAttack();
      expect(result.hit).toBeTruthy();
      expect(result.ship).toBe(ship);
      expect(cell.state).toBeInstanceOf(HitState);
    });

    test("should be attackable and not empty", () => {
      expect(cell.canBeAttacked()).toBeTruthy();
      expect(cell.isEmpty()).toBeFalsy();
    });
  });

  // Testing HitState
  describe("HitState", () => {
    beforeEach(() => {
      cell.placeShip(ship);
      cell.handleAttack(); // First attack
    });

    test("should return invalid result on attack", () => {
      const result = cell.handleAttack();
      expect(result.isValid).toBeFalsy();
      expect(result.message).toBe("Already hit");
    });

    test("should not be attackable and not empty", () => {
      expect(cell.canBeAttacked()).toBeFalsy();
      expect(cell.isEmpty()).toBeFalsy();
    });
  });

  // Testing MissState
  describe("MissState", () => {
    beforeEach(() => {
      cell.state = new MissState();
    });

    test("should return invalid result on attack", () => {
      const result = cell.handleAttack();
      expect(result.isValid).toBeFalsy();
      expect(result.message).toBe("Already missed it");
    });

    test("should not be attackable and not empty", () => {
      expect(cell.canBeAttacked()).toBeFalsy();
      expect(cell.isEmpty()).toBeFalsy();
    });
  });
});
