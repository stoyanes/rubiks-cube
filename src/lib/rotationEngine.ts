import {
  faceNames,
  type CubeState,
  type Face,
  type RotationDirection,
} from "../types";

const CUBE_SIZE = 3;

export const createSolvedCube = (): CubeState => {
  return {
    F: Array.from(
      { length: CUBE_SIZE },
      () => Array(CUBE_SIZE).fill("F") as string[],
    ),
    B: Array.from(
      { length: CUBE_SIZE },
      () => Array(CUBE_SIZE).fill("B") as string[],
    ),
    U: Array.from(
      { length: CUBE_SIZE },
      () => Array(CUBE_SIZE).fill("U") as string[],
    ),
    D: Array.from(
      { length: CUBE_SIZE },
      () => Array(CUBE_SIZE).fill("D") as string[],
    ),
    L: Array.from(
      { length: CUBE_SIZE },
      () => Array(CUBE_SIZE).fill("L") as string[],
    ),
    R: Array.from(
      { length: CUBE_SIZE },
      () => Array(CUBE_SIZE).fill("R") as string[],
    ),
  };
};

// Rotate a face 90 degrees in the given direction
const rotateFace = (
  face: string[][],
  direction: RotationDirection,
): string[][] => {
  const newFace = Array.from(
    { length: CUBE_SIZE },
    () => Array(CUBE_SIZE).fill("") as string[],
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

const getRow = (face: string[][], row: number): string[] => [...face[row]];

const updateRow = (face: string[][], row: number, values: string[]) => {
  for (let i = 0; i < CUBE_SIZE; i++) {
    face[row][i] = values[i];
  }
};

const getColumn = (face: string[][], col: number): string[] =>
  Array.from({ length: CUBE_SIZE }, (_, i) => face[i][col]);

const updateColumn = (
  face: string[][],
  col: number,
  values: string[],
): void => {
  for (let i = 0; i < CUBE_SIZE; i++) {
    face[i][col] = values[i];
  }
};

const rev = (arr: string[]): string[] => [...arr].reverse();

export const rotateCube = (
  cube: CubeState,
  face: Face,
  direction: RotationDirection,
): CubeState => {
  if (!Object.keys(faceNames).includes(face)) {
    throw new Error(`Invalid face: ${face}`);
  }

  if (direction !== "clockwise" && direction !== "counterclockwise") {
    throw new Error(`Invalid rotation direction: ${direction as string}`);
  }

  const newCube = structuredClone(cube);

  newCube[face] = rotateFace(cube[face], direction);

  if (face === "F") {
    const up = getRow(cube.U, CUBE_SIZE - 1);
    const right = getColumn(cube.R, 0);
    const down = getRow(cube.D, 0);
    const left = getColumn(cube.L, CUBE_SIZE - 1);

    if (direction === "clockwise") {
      updateRow(newCube.U, CUBE_SIZE - 1, rev(left));
      updateColumn(newCube.R, 0, up);
      updateRow(newCube.D, 0, rev(right));
      updateColumn(newCube.L, CUBE_SIZE - 1, down);
    } else {
      updateRow(newCube.U, CUBE_SIZE - 1, right);
      updateColumn(newCube.R, 0, rev(down));
      updateRow(newCube.D, 0, left);
      updateColumn(newCube.L, CUBE_SIZE - 1, rev(up));
    }
  } else if (face === "B") {
    const up = getRow(cube.U, 0);
    const right = getColumn(cube.R, CUBE_SIZE - 1);
    const down = getRow(cube.D, CUBE_SIZE - 1);
    const left = getColumn(cube.L, 0);

    if (direction === "clockwise") {
      updateRow(newCube.U, 0, right);
      updateColumn(newCube.R, CUBE_SIZE - 1, rev(down));
      updateRow(newCube.D, CUBE_SIZE - 1, left);
      updateColumn(newCube.L, 0, rev(up));
    } else {
      updateRow(newCube.U, 0, rev(left));
      updateColumn(newCube.R, CUBE_SIZE - 1, up);
      updateRow(newCube.D, CUBE_SIZE - 1, rev(right));
      updateColumn(newCube.L, 0, down);
    }
  } else if (face === "U") {
    const back = getRow(cube.B, 0);
    const right = getRow(cube.R, 0);
    const front = getRow(cube.F, 0);
    const left = getRow(cube.L, 0);

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
    const back = getRow(cube.B, CUBE_SIZE - 1);
    const right = getRow(cube.R, CUBE_SIZE - 1);
    const front = getRow(cube.F, CUBE_SIZE - 1);
    const left = getRow(cube.L, CUBE_SIZE - 1);

    if (direction === "clockwise") {
      updateRow(newCube.F, CUBE_SIZE - 1, left);
      updateRow(newCube.R, CUBE_SIZE - 1, front);
      updateRow(newCube.B, CUBE_SIZE - 1, right);
      updateRow(newCube.L, CUBE_SIZE - 1, back);
    } else {
      updateRow(newCube.F, CUBE_SIZE - 1, right);
      updateRow(newCube.R, CUBE_SIZE - 1, back);
      updateRow(newCube.B, CUBE_SIZE - 1, left);
      updateRow(newCube.L, CUBE_SIZE - 1, front);
    }
  } else if (face === "L") {
    const up = getColumn(cube.U, 0);
    const front = getColumn(cube.F, 0);
    const down = getColumn(cube.D, 0);
    const back = getColumn(cube.B, CUBE_SIZE - 1);

    if (direction === "clockwise") {
      updateColumn(newCube.U, 0, rev(back));
      updateColumn(newCube.F, 0, up);
      updateColumn(newCube.D, 0, front);
      updateColumn(newCube.B, CUBE_SIZE - 1, rev(down));
    } else {
      updateColumn(newCube.U, 0, front);
      updateColumn(newCube.F, 0, down);
      updateColumn(newCube.D, 0, rev(back));
      updateColumn(newCube.B, CUBE_SIZE - 1, rev(up));
    }
  } else if (face === "R") {
    const up = getColumn(cube.U, CUBE_SIZE - 1);
    const front = getColumn(cube.F, CUBE_SIZE - 1);
    const down = getColumn(cube.D, CUBE_SIZE - 1);
    const back = getColumn(cube.B, 0);

    if (direction === "clockwise") {
      updateColumn(newCube.U, CUBE_SIZE - 1, front);
      updateColumn(newCube.F, CUBE_SIZE - 1, down);
      updateColumn(newCube.D, CUBE_SIZE - 1, rev(back));
      updateColumn(newCube.B, 0, rev(up));
    } else {
      updateColumn(newCube.U, CUBE_SIZE - 1, rev(back));
      updateColumn(newCube.F, CUBE_SIZE - 1, up);
      updateColumn(newCube.D, CUBE_SIZE - 1, front);
      updateColumn(newCube.B, 0, rev(down));
    }
  }

  return newCube;
};
