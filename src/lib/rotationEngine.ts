import type { CubeState, Face, RotationDirection } from "../types";

const CUBE_SIZE = 3;

export const createSolvedCube = (): CubeState => {
  return {
    F: Array.from({ length: CUBE_SIZE }, () => Array(CUBE_SIZE).fill("F")),
    B: Array.from({ length: CUBE_SIZE }, () => Array(CUBE_SIZE).fill("B")),
    U: Array.from({ length: CUBE_SIZE }, () => Array(CUBE_SIZE).fill("U")),
    D: Array.from({ length: CUBE_SIZE }, () => Array(CUBE_SIZE).fill("D")),
    L: Array.from({ length: CUBE_SIZE }, () => Array(CUBE_SIZE).fill("L")),
    R: Array.from({ length: CUBE_SIZE }, () => Array(CUBE_SIZE).fill("R")),
  };
};

const deepCopy = (state: CubeState): CubeState => {
  return structuredClone(state);
};

// Rotate a face 90 degrees in the given direction
const rotateFaceGrid = (
  face: string[][],
  direction: RotationDirection,
): string[][] => {
  const newFace = Array.from({ length: CUBE_SIZE }, () =>
    Array(CUBE_SIZE).fill(""),
  );

  for (let i = 0; i < CUBE_SIZE; i++) {
    for (let j = 0; j < CUBE_SIZE; j++) {
      if (direction === "clockwise") {
        newFace[j][CUBE_SIZE - 1 - i] = face[i][j];
      } else {
        newFace[CUBE_SIZE - 1 - j][i] = face[i][j];
      }
    }
  }
  return newFace;
};

const copyRow = (face: string[][], row: number): string[] => [...face[row]];

const updateRow = (face: string[][], row: number, values: string[]) => {
  for (let i = 0; i < CUBE_SIZE; i++) {
    face[row][i] = values[i];
  }
};

const copyCol = (face: string[][], col: number): string[] =>
  Array.from({ length: CUBE_SIZE }, (_, i) => face[i][col]);

const updateCol = (face: string[][], col: number, values: string[]): void => {
  for (let i = 0; i < CUBE_SIZE; i++) {
    face[i][col] = values[i];
  }
};

const rev = (arr: string[]): string[] => [...arr].reverse();

export const rotateFace = (
  cube: CubeState,
  face: Face,
  direction: RotationDirection,
): CubeState => {
  const newCube = deepCopy(cube);

  // Rotate the face itself
  newCube[face] = rotateFaceGrid(cube[face], direction);

  if (face === "F") {
    const up = copyRow(cube.U, 2);
    const right = copyCol(cube.R, 0);
    const down = copyRow(cube.D, 0);
    const left = copyCol(cube.L, 2);

    if (direction === "clockwise") {
      updateRow(newCube.U, 2, rev(left));
      updateCol(newCube.R, 0, up);
      updateRow(newCube.D, 0, rev(right));
      updateCol(newCube.L, 2, down);
    } else {
      updateRow(newCube.U, 2, right);
      updateCol(newCube.R, 0, rev(down));
      updateRow(newCube.D, 0, left);
      updateCol(newCube.L, 2, rev(up));
    }
  } else if (face === "B") {
    const up = copyRow(cube.U, 0);
    const right = copyCol(cube.R, 2);
    const down = copyRow(cube.D, 2);
    const left = copyCol(cube.L, 0);

    if (direction === "clockwise") {
      updateRow(newCube.U, 0, right);
      updateCol(newCube.R, 2, rev(down));
      updateRow(newCube.D, 2, left);
      updateCol(newCube.L, 0, rev(up));
    } else {
      updateRow(newCube.U, 0, rev(left));
      updateCol(newCube.R, 2, up);
      updateRow(newCube.D, 2, rev(right));
      updateCol(newCube.L, 0, down);
    }
  } else if (face === "U") {
    const back = copyRow(cube.B, 0);
    const right = copyRow(cube.R, 0);
    const front = copyRow(cube.F, 0);
    const left = copyRow(cube.L, 0);

    if (direction === "clockwise") {
      updateRow(newCube.F, 0, right);
      updateRow(newCube.R, 0, back);
      updateRow(newCube.B, 0, left);
      updateRow(newCube.L, 0, front);
    } else {
      updateRow(newCube.F, 0, left);
      updateRow(newCube.R, 0, front);
      updateRow(newCube.B, 0, right);
      updateRow(newCube.L, 0, back);
    }
  } else if (face === "D") {
    const back = copyRow(cube.B, 2);
    const right = copyRow(cube.R, 2);
    const front = copyRow(cube.F, 2);
    const left = copyRow(cube.L, 2);

    if (direction === "clockwise") {
      updateRow(newCube.F, 2, left);
      updateRow(newCube.R, 2, front);
      updateRow(newCube.B, 2, right);
      updateRow(newCube.L, 2, back);
    } else {
      updateRow(newCube.F, 2, right);
      updateRow(newCube.R, 2, back);
      updateRow(newCube.B, 2, left);
      updateRow(newCube.L, 2, front);
    }
  } else if (face === "L") {
    const up = copyCol(cube.U, 0);
    const front = copyCol(cube.F, 0);
    const down = copyCol(cube.D, 0);
    const back = copyCol(cube.B, 2);

    if (direction === "clockwise") {
      updateCol(newCube.U, 0, back.reverse());
      updateCol(newCube.F, 0, up);
      updateCol(newCube.D, 0, front);
      updateCol(newCube.B, 2, down.reverse());
    } else {
      updateCol(newCube.U, 0, front);
      updateCol(newCube.F, 0, down);
      updateCol(newCube.D, 0, back.reverse());
      updateCol(newCube.B, 2, up.reverse());
    }
  } else if (face === "R") {
    const up = copyCol(cube.U, 2);
    const front = copyCol(cube.F, 2);
    const down = copyCol(cube.D, 2);
    const back = copyCol(cube.B, 0);

    if (direction === "clockwise") {
      updateCol(newCube.U, 2, front);
      updateCol(newCube.F, 2, down);
      updateCol(newCube.D, 2, back.reverse());
      updateCol(newCube.B, 0, up.reverse());
    } else {
      updateCol(newCube.U, 2, back.reverse());
      updateCol(newCube.F, 2, up);
      updateCol(newCube.D, 2, front);
      updateCol(newCube.B, 0, down.reverse());
    }
  }

  return newCube;
};
