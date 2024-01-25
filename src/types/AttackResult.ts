import { Ship } from "./Ship";

export class AttackResult {
  hit: boolean;
  sunk: boolean;
  ship: Ship | null;
  isValid: boolean;
  message: string;

  constructor(
    hit: boolean,
    sunk: boolean = false,
    ship: Ship | null = null,
    message: string = "",
  ) {
    this.hit = hit;
    this.sunk = sunk;
    this.ship = ship;
    this.isValid = true; // Default to true, indicating a valid attack
    this.message = message;
  }

  // Static method to create an invalid attack result
  static invalid(message: string): AttackResult {
    const result = new AttackResult(false);
    result.isValid = false;
    result.message = message;
    return result;
  }
}
