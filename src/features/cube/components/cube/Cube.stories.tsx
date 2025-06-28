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

    await new Promise((resolve) => setTimeout(resolve, 2_000));

    const resetBtn = canvas.getByText("Reset Cube");

    await userEvent.click(resetBtn);
  },
};

export const ComplexRotationDoingRequirementsExample: Story = {
  render: () => <Cube />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const frontClockwiseBtn = canvas.getByTitle("Front clockwise");
    await userEvent.click(frontClockwiseBtn);

    await new Promise((resolve) => setTimeout(resolve, 1_000));

    const rightCounterClockwiseBtn = canvas.getByTitle(
      "Right counterclockwise",
    );
    await userEvent.click(rightCounterClockwiseBtn);

    await new Promise((resolve) => setTimeout(resolve, 1_000));

    const upClockwiseBtn = canvas.getByTitle("Up clockwise");
    await userEvent.click(upClockwiseBtn);

    await new Promise((resolve) => setTimeout(resolve, 1_000));

    const backCounterClockwiseBtn = canvas.getByTitle("Back counterclockwise");
    await userEvent.click(backCounterClockwiseBtn);

    await new Promise((resolve) => setTimeout(resolve, 1_000));

    const leftClockwiseBtn = canvas.getByTitle("Left clockwise");
    await userEvent.click(leftClockwiseBtn);

    await new Promise((resolve) => setTimeout(resolve, 1_000));

    const downCounterClockwiseBtn = canvas.getByTitle("Down counterclockwise");
    await userEvent.click(downCounterClockwiseBtn);
  },
};
