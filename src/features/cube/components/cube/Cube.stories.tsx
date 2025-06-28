import { type StoryObj } from "@storybook/react-vite";
import { within, userEvent } from "@storybook/testing-library";

import Cube from "./Cube";

export default {
  title: "Features/Cube",
  component: Cube,
};

type Story = StoryObj<typeof Cube>;

export const Default: Story = {
  render: () => <Cube />,
};

export const RotateCubeFrontClockwise: Story = {
  render: () => <Cube />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const frontClockwiseBtn = canvas.getByTitle("Front clockwise");

    await userEvent.click(frontClockwiseBtn);
  },
};

export const RotateCubeFrontCounterClockwise: Story = {
  render: () => <Cube />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const frontCounterClockwiseBtn = canvas.getByTitle(
      "Front counterclockwise",
    );

    await userEvent.click(frontCounterClockwiseBtn);
  },
};

export const ResetCube: Story = {
  render: () => <Cube />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const frontClockwiseBtn = canvas.getByTitle("Front clockwise");
    await userEvent.click(frontClockwiseBtn);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const resetBtn = canvas.getByText("Reset Cube");

    await userEvent.click(resetBtn);
  },
};
