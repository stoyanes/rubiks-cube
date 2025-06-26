import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import FaceRotationButtons from "../FaceRotationButtons";

describe("FaceRotationButtons", () => {
  const mockOnRotate = vi.fn();

  beforeEach(() => {
    mockOnRotate.mockClear();
  });

  test("renders all face rotation buttons", () => {
    render(<FaceRotationButtons onRotate={mockOnRotate} />);

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
});
