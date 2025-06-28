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

  test("renders all face rotation buttons", () => {
    render(<Actions onRotate={mockOnRotate} onReset={mockOnReset} />);

    expect(screen.getByTitle("Front clockwise")).toBeInTheDocument();
    expect(screen.getByTitle("Front counterclockwise")).toBeInTheDocument();
    expect(screen.getByTitle("Back clockwise")).toBeInTheDocument();
    expect(screen.getByTitle("Back counterclockwise")).toBeInTheDocument();
    expect(screen.getByTitle("Left clockwise")).toBeInTheDocument();
    expect(screen.getByTitle("Left counterclockwise")).toBeInTheDocument();
    expect(screen.getByTitle("Right clockwise")).toBeInTheDocument();
    expect(screen.getByTitle("Right counterclockwise")).toBeInTheDocument();
    expect(screen.getByTitle("Up clockwise")).toBeInTheDocument();
    expect(screen.getByTitle("Up counterclockwise")).toBeInTheDocument();
    expect(screen.getByTitle("Down clockwise")).toBeInTheDocument();
    expect(screen.getByTitle("Down counterclockwise")).toBeInTheDocument();
  });

  test("renders FaceRotationButtons component and Reset Cube button", () => {
    render(<Actions onRotate={mockOnRotate} onReset={mockOnReset} />);

    expect(screen.getByTestId("face-rotation-buttons")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /reset cube/i }),
    ).toBeInTheDocument();
  });
});
