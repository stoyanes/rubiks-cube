export type Face = "F" | "R" | "U" | "B" | "L" | "D";

export const faceNames: Record<Face, string> = {
  F: "Front",
  R: "Right",
  U: "Up",
  B: "Back",
  L: "Left",
  D: "Down",
};

export type FaceColor =
  | "white"
  | "yellow"
  | "red"
  | "orange"
  | "blue"
  | "green";

export type RotationDirection = "clockwise" | "counterclockwise";

export type CubeState = Record<Face, string[][]>;

export const faceColors: Record<Face, FaceColor> = {
  U: "white",
  D: "yellow",
  F: "green",
  B: "blue",
  L: "orange",
  R: "red",
};
