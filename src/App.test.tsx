import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { HumanPlayer, SimpleAIPlayer } from "./types/Player";

// Mock the randomizeShipsLocation method to prevent random behavior in tests
SimpleAIPlayer.prototype.randomizeShipsLocation = jest.fn();

describe("App Component", () => {
  beforeEach(() => {
    // Clear any previous mock calls
    //SimpleAIPlayer.prototype.randomizeShipsLocation.mockClear();
  });

  test("renders without errors", () => {
    render(<App />);
    const titleElement = screen.getByText(/Battleship/i); // Case-insensitive text matching
    expect(titleElement).toBeInTheDocument();
  });

  test('initial game phase is "placeShip"', () => {
    render(<App />);
    const placeShipText = screen.getByText(/Deploy your Ships/i); // Case-insensitive text matching
    expect(placeShipText).toBeInTheDocument();
  });
});
