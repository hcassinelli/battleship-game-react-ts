import { Ship } from "./Ship";

describe("Ship", () => {
  let ship: Ship;

  beforeEach(() => {
    ship = new Ship("ship1", 3);
  });

  it("should create a ship with the specified length and hits initialized to 0", () => {
    expect(ship.id).toBe("ship1");
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
  });

  it("should increase the hits count when hit() is called", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  it("should throw an error if hit() is called after the ship is sunk", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(() => ship.hit()).toThrowError("Ship has already sunk");
  });

  it("should return true from isSunk() when hits equals the ship length", () => {
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  it("should return false from isSunk() when hits is less than the ship length", () => {
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});
