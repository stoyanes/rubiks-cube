import { useCallback, useState } from "react";
import {
  faceColors,
  type CubeState,
  type Face,
  type RotationDirection,
} from "../../../../types";
import { createSolvedCube, rotateCube } from "../../../../lib/rotationEngine";
import Actions from "../actions/Actions";

const CubeFace = (cube: CubeState, face: Face) => {
  return (
    <div className="grid grid-cols-3 gap-0" role="row">
      {cube[face].map((row, i) =>
        row.map((cell, j) => (
          <div
            // eslint-disable-next-line react-x/no-array-index-key
            key={`${face}-${i}-${j}`}
            className="w-11 h-11 border border-gray-800"
            style={{ background: faceColors[cell as Face] }}
            role="gridcell"
          />
        )),
      )}
    </div>
  );
};

const CubeView = ({ cube }: { cube: CubeState }) => {
  return (
    <div
      data-testid="cube-view-container"
      className="flex flex-col items-center"
      role="grid"
    >
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

/**
 * Cube component for displaying and interacting with a Rubik's Cube.
 *
 * Renders the cube (CubeView component) and action controls. Maintains the cube state and handles
 * rotation and reset actions.
 *
 * @component
 * @returns {JSX.Element} The rendered Cube component.
 */
const Cube = () => {
  const [cube, setCube] = useState(createSolvedCube());

  const handleRotate = useCallback(
    (face: Face, direction: RotationDirection) => {
      setCube((prev) => rotateCube(prev, face, direction));
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
