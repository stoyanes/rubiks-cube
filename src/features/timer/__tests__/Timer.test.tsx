import "@testing-library/jest-dom/vitest";
import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Timer from "../Timer";

describe("Timer Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  test("renders correctly", () => {
    render(<Timer />);
    expect(screen.getByText(/start/i)).toBeInTheDocument();
    expect(screen.getByText(/pause/i)).toBeInTheDocument();
    expect(screen.getByText(/reset/i)).toBeInTheDocument();
    expect(screen.getByText("0s")).toBeInTheDocument();
  });

  test("starts the timer then pauses it", () => {
    render(<Timer />);

    fireEvent.click(screen.getByText(/start/i));
    vi.advanceTimersByTime(2000);
    fireEvent.click(screen.getByText(/pause/i));
    vi.advanceTimersByTime(2000);

    expect(screen.getByText("2s")).toBeInTheDocument();
  });

  test("starts the timer then resets it", () => {
    render(<Timer />);

    fireEvent.click(screen.getByText(/start/i));
    vi.advanceTimersByTime(3000);
    fireEvent.click(screen.getByText(/reset/i));

    expect(screen.getByText("0s")).toBeInTheDocument();
  });

  test("Start button is disabled when running", () => {
    render(<Timer />);

    const startBtn = screen.getByText(/start/i);
    fireEvent.click(startBtn);
    expect(startBtn).toBeDisabled();
  });

  test("Pause button is disabled when not running", () => {
    render(<Timer />);

    const pauseBtn = screen.getByText(/pause/i);
    expect(pauseBtn).toBeDisabled();
    fireEvent.click(screen.getByText(/start/i));
    expect(pauseBtn).not.toBeDisabled();
  });

  test("Reset button resets timer and enables Start", () => {
    render(<Timer />);
    const startBtn = screen.getByText(/start/i);
    fireEvent.click(startBtn);
    vi.advanceTimersByTime(1500);
    fireEvent.click(screen.getByText(/reset/i));
    expect(screen.getByText("0s")).toBeInTheDocument();
    expect(startBtn).not.toBeDisabled();
  });

  test("Timer does not increment when paused", () => {
    render(<Timer />);
    fireEvent.click(screen.getByText(/start/i));
    vi.advanceTimersByTime(2000);
    fireEvent.click(screen.getByText(/pause/i));
    vi.advanceTimersByTime(3000);
    expect(screen.getByText("2s")).toBeInTheDocument();
  });

  test("Multiple resets keep timer at 0", () => {
    render(<Timer />);
    fireEvent.click(screen.getByText(/reset/i));
    expect(screen.getByText("0s")).toBeInTheDocument();
    fireEvent.click(screen.getByText(/reset/i));
    fireEvent.click(screen.getByText(/reset/i));
    expect(screen.getByText("0s")).toBeInTheDocument();
  });

  test("Pause and then start resumes timer", () => {
    render(<Timer />);

    fireEvent.click(screen.getByText(/start/i));
    vi.advanceTimersByTime(2000);
    fireEvent.click(screen.getByText(/pause/i));

    vi.advanceTimersByTime(2000);
    fireEvent.click(screen.getByText(/start/i));

    expect(screen.getByText("2s")).toBeInTheDocument();
  });
});
