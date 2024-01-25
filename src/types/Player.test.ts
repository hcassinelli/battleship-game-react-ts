import { HumanPlayer, SimpleAIPlayer } from "./Player";
import { AttackResult } from "./AttackResult";
import { Ship } from "./Ship";
import { BOARD_SIZE, generateShips } from "../utils/configs";

// Helper function to create a dummy ship for testing
function createDummyShip(): Ship {
  return new Ship("Dummy", 1);
}

describe("Player Class", () => {
  test("constructor initializes properties correctly", () => {
    const player = new HumanPlayer("Player 1");
    expect(player.name).toBe("Player 1");
    expect(player.board).toBeDefined();
    expect(player.deployableShips).toHaveLength(generateShips().length);
    expect(player.deployedShips).toHaveLength(0);
  });

  test("placeShip places a ship correctly", () => {
    const player = new HumanPlayer("Player 1");
    const shipToPlace = createDummyShip();
    const row = 0;
    const col = 0;
    const horizontal = true;
    const result = player.placeShip(shipToPlace, row, col, horizontal);
    expect(result).toBe(true);
    expect(player.deployedShips).toContain(shipToPlace);
  });

  test("attack should return AttackResult", () => {
    const player1 = new HumanPlayer("Player 1");
    const player2 = new HumanPlayer("Player 2");
    const attackResult = player1.attack(player2, 1, 1);
    expect(attackResult instanceof AttackResult).toBe(true);
  });

  test("randomizeShipsLocation should place all ships", () => {
    const player = new HumanPlayer("Player 1");
    player.randomizeShipsLocation();
    expect(player.deployedShips.length).toBe(player.deployableShips.length);
  });

  test("isDefeated should return true when all ships are sunk", () => {
    const player = new HumanPlayer("Player 1");
    player.deployedShips = [createDummyShip(), createDummyShip()];
    player.deployedShips.forEach((ship) => ship.hit()); // Sinking all ships
    const defeated = player.isDefeated();
    expect(defeated).toBe(true);
  });
});

describe("HumanPlayer Class", () => {
  test("constructor initializes properties correctly", () => {
    const player = new HumanPlayer("Player 1");
    expect(player.name).toBe("Player 1");
    expect(player.board).toBeDefined();
    expect(player.deployableShips).toHaveLength(generateShips().length);
    expect(player.deployedShips).toHaveLength(0);
  });

  test("attack should return AttackResult", () => {
    const player1 = new HumanPlayer("Player 1");
    const player2 = new HumanPlayer("Player 2");
    const attackResult = player1.attack(player2, 1, 1);
    expect(attackResult instanceof AttackResult).toBe(true);
  });
});

describe("SimpleAIPlayer Class", () => {
  test("constructor initializes properties correctly", () => {
    const player = new SimpleAIPlayer("Terminator");
    expect(player.name).toBe("Terminator");
    expect(player.board).toBeDefined();
    expect(player.deployableShips).toHaveLength(generateShips().length);
    expect(player.deployedShips).toHaveLength(0);
  });

  test("attack should return AttackResult", () => {
    const player1 = new HumanPlayer("Player 1");
    const player2 = new SimpleAIPlayer("Terminator");
    const attackResult = player1.attack(player2);
    expect(attackResult instanceof AttackResult).toBe(true);
  });
});
