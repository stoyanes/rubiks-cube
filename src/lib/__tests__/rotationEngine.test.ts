import { expect, test, describe } from "vitest";
import { createSolvedCube, rotateCube } from "../rotationEngine";

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

describe("rotateCube", () => {
  test("rotating F face clockwise updates the cube correctly", () => {
    const cube = createSolvedCube();
    const rotated = rotateCube(cube, "F", "clockwise");

    expect(rotated.F).toEqual([
      ["F", "F", "F"],
      ["F", "F", "F"],
      ["F", "F", "F"],
    ]);

    expect(rotated.B).toEqual([
      ["B", "B", "B"],
      ["B", "B", "B"],
      ["B", "B", "B"],
    ]);

    expect(rotated.U).toEqual([
      ["U", "U", "U"],
      ["U", "U", "U"],
      ["L", "L", "L"],
    ]);

    expect(rotated.D).toEqual([
      ["R", "R", "R"],
      ["D", "D", "D"],
      ["D", "D", "D"],
    ]);

    expect(rotated.L).toEqual([
      ["L", "L", "D"],
      ["L", "L", "D"],
      ["L", "L", "D"],
    ]);

    expect(rotated.R).toEqual([
      ["U", "R", "R"],
      ["U", "R", "R"],
      ["U", "R", "R"],
    ]);
  });

  test("rotating F face counterclockwise updates the cube correctly", () => {
    const cube = createSolvedCube();
    const rotated = rotateCube(cube, "F", "counterclockwise");

    expect(rotated.F).toEqual([
      ["F", "F", "F"],
      ["F", "F", "F"],
      ["F", "F", "F"],
    ]);
    expect(rotated.B).toEqual([
      ["B", "B", "B"],
      ["B", "B", "B"],
      ["B", "B", "B"],
    ]);

    expect(rotated.U).toEqual([
      ["U", "U", "U"],
      ["U", "U", "U"],
      ["R", "R", "R"],
    ]);

    expect(rotated.D).toEqual([
      ["L", "L", "L"],
      ["D", "D", "D"],
      ["D", "D", "D"],
    ]);

    expect(rotated.L).toEqual([
      ["L", "L", "U"],
      ["L", "L", "U"],
      ["L", "L", "U"],
    ]);

    expect(rotated.R).toEqual([
      ["D", "R", "R"],
      ["D", "R", "R"],
      ["D", "R", "R"],
    ]);
  });

  test("rotating the same face four times returns to original for solved cube", () => {
    const cube = createSolvedCube();

    let rotated = cube;
    for (let i = 0; i < 4; i++) {
      rotated = rotateCube(rotated, "F", "clockwise");
    }
    expect(rotated).toEqual(cube);
  });

  test("rotating all faces once does not return to original", () => {
    const cube = createSolvedCube();

    let rotated = rotateCube(cube, "F", "clockwise");
    rotated = rotateCube(rotated, "B", "clockwise");
    rotated = rotateCube(rotated, "U", "clockwise");
    rotated = rotateCube(rotated, "D", "clockwise");
    rotated = rotateCube(rotated, "L", "clockwise");
    rotated = rotateCube(rotated, "R", "clockwise");

    expect(rotated).not.toEqual(cube);
  });

  test("rotating a face twice (clockwise and then counterclockwise) returns to original for solved cube", () => {
    const cube = createSolvedCube();
    const rotated = rotateCube(
      rotateCube(cube, "F", "clockwise"),
      "F",
      "counterclockwise",
    );

    expect(rotated).toEqual(cube);
  });

  test("rotating with invalid face throws error", () => {
    const cube = createSolvedCube();

    expect(() => rotateCube(cube, "X" as never, "clockwise")).toThrow();
  });

  test("rotating with invalid direction throws error", () => {
    const cube = createSolvedCube();

    expect(() => rotateCube(cube, "F", "invalid" as never)).toThrow();
  });

  test("rotating U and L counter clockwise", () => {
    const cube = createSolvedCube();
    let rotated = rotateCube(cube, "U", "counterclockwise");
    rotated = rotateCube(rotated, "L", "counterclockwise");

    expect(rotated.U).toEqual([
      ["L", "U", "U"],
      ["F", "U", "U"],
      ["F", "U", "U"],
    ]);

    expect(rotated.L).toEqual([
      ["B", "L", "L"],
      ["B", "L", "L"],
      ["B", "L", "L"],
    ]);
  });

  test("complex rotation sequence (from requirements document example)", () => {
    const cube = createSolvedCube();
    let rotated = rotateCube(cube, "F", "clockwise");
    rotated = rotateCube(rotated, "R", "counterclockwise");
    rotated = rotateCube(rotated, "U", "clockwise");
    rotated = rotateCube(rotated, "B", "counterclockwise");
    rotated = rotateCube(rotated, "L", "clockwise");
    rotated = rotateCube(rotated, "D", "counterclockwise");

    expect(rotated.F).toEqual([
      ["L", "R", "R"],
      ["L", "F", "U"],
      ["U", "U", "U"],
    ]);

    expect(rotated.R).toEqual([
      ["D", "B", "L"],
      ["R", "R", "U"],
      ["L", "D", "R"],
    ]);

    expect(rotated.U).toEqual([
      ["R", "L", "F"],
      ["B", "U", "U"],
      ["B", "B", "B"],
    ]);

    expect(rotated.L).toEqual([
      ["F", "D", "D"],
      ["L", "L", "F"],
      ["B", "F", "L"],
    ]);

    expect(rotated.B).toEqual([
      ["D", "B", "U"],
      ["L", "B", "D"],
      ["D", "D", "U"],
    ]);

    expect(rotated.D).toEqual([
      ["F", "F", "B"],
      ["R", "D", "R"],
      ["R", "F", "F"],
    ]);
  });
});
