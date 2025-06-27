import "@testing-library/jest-dom/vitest";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import Cube from "../Cube";

describe("Cube Component", () => {
  test("renders without crashing", () => {
    render(<Cube />);

    expect(screen.getByTestId("cube-view-container")).toBeInTheDocument();
  });

  test("renders all 6 faces with 9 cells each", () => {
    render(<Cube />);

    // There should be 6 faces * 9 cells = 54 cells
    expect(screen.getAllByRole("face-cell", { hidden: true }).length).toBe(54);
  });

  test("renders the Actions component", () => {
    render(<Cube />);

    // Actions should render at least a reset button
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });
});
