import React from "react";
import { render } from "@testing-library/react"; // Import render from testing library
import App from "./App";

describe("App Render", () => {
  it("renders App component without errors", () => {
    // Render the App component
    const { container } = render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );

    // Assert that the component is rendered without errors
    expect(container).toBeInTheDocument();
  });
});
