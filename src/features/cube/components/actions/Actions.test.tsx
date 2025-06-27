import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Actions from "./Actions";

describe("Actions Component", () => {
  const mockOnRotate = vi.fn();
  const mockOnReset = vi.fn();

  beforeEach(() => {
    mockOnRotate.mockClear();
    mockOnReset.mockClear();
  });

  test("renders FaceRotationButtons component and Reset Cube button", () => {
    render(<Actions onRotate={mockOnRotate} onReset={mockOnReset} />);

    expect(screen.getByTestId("face-rotation-buttons")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /reset cube/i }),
    ).toBeInTheDocument();
  });
});
