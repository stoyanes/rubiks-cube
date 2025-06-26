import { faceColors, type CubeState, type Face } from "../types";

interface CubeProps {
  cube: CubeState;
}

const renderFace = (cube: CubeState, face: Face) => {
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

const Cube = ({ cube }: CubeProps) => {
  return (
    <div>
      {/* Exploded 2D view */}
      <div className="flex flex-col items-center">
        {/* Up face */}
        <div className="-ml-33">{renderFace(cube, "U")}</div>
        {/* Middle row: L F R B */}
        <div className="flex">
          <div>{renderFace(cube, "L")}</div>
          <div>{renderFace(cube, "F")}</div>
          <div>{renderFace(cube, "R")}</div>
          <div>{renderFace(cube, "B")}</div>
        </div>
        {/* Down face */}
        <div className="-ml-33">{renderFace(cube, "D")}</div>
      </div>
    </div>
  );
};

export default Cube;
