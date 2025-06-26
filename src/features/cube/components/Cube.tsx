import { useCallback, useState } from "react";
import {
  faceColors,
  type CubeState,
  type Face,
  type RotationDirection,
} from "../../../types";
import Actions from "./actions";
import { createSolvedCube, rotateFace } from "../../../lib/rotationEngine";

const CubeFace = (cube: CubeState, face: Face) => {
  return (
    <div className="grid grid-cols-3 gap-0">
      {cube[face].map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            className="w-11 h-11 border border-gray-800"
            style={{ background: faceColors[cell as Face] }}
          />
        )),
      )}
    </div>
  );
};

const CubeView = ({ cube }: { cube: CubeState }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Up face */}
      <div className="-ml-33">{CubeFace(cube, "U")}</div>
      {/* Middle row: L F R B */}
      <div className="flex">
        <div>{CubeFace(cube, "L")}</div>
        <div>{CubeFace(cube, "F")}</div>
        <div>{CubeFace(cube, "R")}</div>
        <div>{CubeFace(cube, "B")}</div>
      </div>
      {/* Down face */}
      <div className="-ml-33">{CubeFace(cube, "D")}</div>
    </div>
  );
};

const Cube = () => {
  const [cube, setCube] = useState(createSolvedCube());

  const handleRotate = useCallback(
    (face: Face, direction: RotationDirection) => {
      setCube((prev) => rotateFace(prev, face, direction));
    },
    [],
  );

  const handleReset = useCallback(() => {
    setCube(createSolvedCube());
  }, []);

  return (
    <>
      <CubeView cube={cube} />
      <Actions onRotate={handleRotate} onReset={handleReset} />
    </>
  );
};

export default Cube;
