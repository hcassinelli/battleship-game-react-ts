import { AttackResult } from "./AttackResult";
import { Ship } from "./Ship";

describe("AttackResult Class", () => {
  let ship: Ship;

  beforeEach(() => {
    ship = new Ship("battleship", 4);
  });

  test("should create a valid attack result", () => {
    const result = new AttackResult(true, false, ship, "Hit!");
    expect(result.hit).toBeTruthy();
    expect(result.sunk).toBeFalsy();
    expect(result.ship).toBe(ship);
    expect(result.isValid).toBeTruthy();
    expect(result.message).toBe("Hit!");
  });

  test("should create an invalid attack result using static method", () => {
    const message = "Invalid attack";
    const result = AttackResult.invalid(message);
    expect(result.hit).toBeFalsy();
    expect(result.sunk).toBeFalsy();
    expect(result.ship).toBeNull();
    expect(result.isValid).toBeFalsy();
    expect(result.message).toBe(message);
  });
});
