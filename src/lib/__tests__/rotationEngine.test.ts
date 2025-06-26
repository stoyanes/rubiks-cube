import { expect, test, describe } from "vitest";
import { createSolvedCube, rotateCubeFace } from "../rotationEngine";

describe("createSolvedCube", () => {
  test("returns a solved cube", () => {
    const cube = createSolvedCube();

    expect(cube.F.every((row) => row.every((cell) => cell === "F"))).toBe(true);
    expect(cube.B.every((row) => row.every((cell) => cell === "B"))).toBe(true);
    expect(cube.U.every((row) => row.every((cell) => cell === "U"))).toBe(true);
    expect(cube.D.every((row) => row.every((cell) => cell === "D"))).toBe(true);
    expect(cube.L.every((row) => row.every((cell) => cell === "L"))).toBe(true);
    expect(cube.R.every((row) => row.every((cell) => cell === "R"))).toBe(true);
  });
});

describe("rotateCubeFace", () => {
  test("rotating F face clockwise updates the F face correctly", () => {
    const cube = createSolvedCube();
    const rotated = rotateCubeFace(cube, "F", "clockwise");

    // The F face should be rotated (but since all stickers are the same, it should look the same)
    expect(rotated.F).toEqual([
      ["F", "F", "F"],
      ["F", "F", "F"],
      ["F", "F", "F"],
    ]);

    expect(cube).not.toEqual(rotated);
  });

  test("rotating F face counterclockwise updates the F face correctly", () => {
    const cube = createSolvedCube();
    const rotated = rotateCubeFace(cube, "F", "counterclockwise");

    // The F face should be rotated (but since all stickers are the same, it should look the same)
    expect(rotated.F).toEqual([
      ["F", "F", "F"],
      ["F", "F", "F"],
      ["F", "F", "F"],
    ]);
  });

  test("rotating F face counterclockwise updates the cube correctly", () => {
    const cube = createSolvedCube();
    const rotated = rotateCubeFace(cube, "F", "counterclockwise");

    expect(cube).not.toEqual(rotated);
    expect(rotated.U[2]).toEqual(["R", "R", "R"]);
    expect(rotated.R[0]).toEqual(["D", "R", "R"]);
    expect(rotated.D[0]).toEqual(["L", "L", "L"]);
    expect(rotated.L[2]).toEqual(["L", "L", "U"]);
  });

  test("rotating the same face four times returns to original for solved cube", () => {
    const cube = createSolvedCube();
    let rotated = cube;
    for (let i = 0; i < 4; i++) {
      rotated = rotateCubeFace(rotated, "F", "clockwise");
    }
    expect(rotated).toEqual(cube);
  });

  test("rotating all faces once does not return to original", () => {
    const cube = createSolvedCube();
    let rotated = rotateCubeFace(cube, "F", "clockwise");
    rotated = rotateCubeFace(rotated, "B", "clockwise");
    rotated = rotateCubeFace(rotated, "U", "clockwise");
    rotated = rotateCubeFace(rotated, "D", "clockwise");
    rotated = rotateCubeFace(rotated, "L", "clockwise");
    rotated = rotateCubeFace(rotated, "R", "clockwise");
    expect(rotated).not.toEqual(cube);
  });

  test("rotating a face twice (clockwise and then counterclockwise) returns to original for solved cube", () => {
    const cube = createSolvedCube();
    const rotated = rotateCubeFace(
      rotateCubeFace(cube, "F", "clockwise"),
      "F",
      "counterclockwise",
    );

    expect(rotated).toEqual(cube);
  });

  test("rotating with invalid face throws error", () => {
    const cube = createSolvedCube();
    expect(() => rotateCubeFace(cube, "X" as never, "clockwise")).toThrow();
  });

  test("rotating with invalid direction throws error", () => {
    const cube = createSolvedCube();
    expect(() => rotateCubeFace(cube, "F", "invalid" as never)).toThrow();
  });

  test("rotating U face clockwise updates the cube correctly", () => {
    const cube = createSolvedCube();
    const rotated = rotateCubeFace(cube, "U", "clockwise");

    expect(cube).not.toEqual(rotated);
    expect(rotated.F[0]).toEqual(["R", "R", "R"]);
    expect(rotated.R[0]).toEqual(["B", "B", "B"]);
    expect(rotated.B[0]).toEqual(["L", "L", "L"]);
    expect(rotated.L[0]).toEqual(["F", "F", "F"]);
  });
});
