export class Ship {
  length: number;
  hits: number;
  id: string;

  constructor(id: string, length: number) {
    this.length = length;
    this.hits = 0;
    this.id = id;
  }

  hit() {
    if (this.isSunk()) {
      throw new Error("Ship has already sunk");
    }
    this.hits++;
  }

  isSunk(): boolean {
    return this.hits === this.length;
  }
}
