import { type StoryObj } from "@storybook/react-vite";
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import Timer from "./Timer";

export default {
  title: "Features/Timer",
  component: Timer,
};

type Story = StoryObj<typeof Timer>;

export const Default: Story = {
  render: () => <Timer />,
};

export const StartsOnClick = {
  render: () => <Timer />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const startButton = await canvas.findByRole("button", { name: /start/i });
    await userEvent.click(startButton);

    await new Promise((resolve) => setTimeout(resolve, 2_000));

    const timerDisplay = await canvas.findByTestId("timer-value");
    expect(timerDisplay.textContent).not.toBe("0s");
  },
};

export const PausesOnClick = {
  render: () => <Timer />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const startButton = await canvas.findByRole("button", { name: /start/i });
    await userEvent.click(startButton);

    await new Promise((resolve) => setTimeout(resolve, 2_000));

    const pauseButton = await canvas.findByRole("button", { name: /pause/i });
    await userEvent.click(pauseButton);

    const timerDisplay = await canvas.findByTestId("timer-value");
    expect(timerDisplay.textContent).not.toBe("0s");
  },
};

export const ResetsOnClick = {
  render: () => <Timer />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const startButton = await canvas.findByRole("button", { name: /start/i });
    await userEvent.click(startButton);

    await new Promise((resolve) => setTimeout(resolve, 2_000));

    const resetButton = await canvas.findByRole("button", { name: /reset/i });
    await userEvent.click(resetButton);

    const timerDisplay = await canvas.findByTestId("timer-value");
    expect(timerDisplay.textContent).toBe("0s");
  },
};
