import { useState } from "react";

type Face = "U" | "D" | "F" | "B" | "L" | "R";
type CubeState = Record<Face, string[]>;

const faceColors: Record<Face, string> = {
  U: "white",
  D: "yellow",
  F: "green",
  B: "blue",
  L: "orange",
  R: "red",
};

function getInitialCube(): CubeState {
  return {
    U: Array(9).fill("U"),
    D: Array(9).fill("D"),
    F: Array(9).fill("F"),
    B: Array(9).fill("B"),
    L: Array(9).fill("L"),
    R: Array(9).fill("R"),
  };
}

function RubiksCube() {
  const [cube] = useState<CubeState>(getInitialCube());

  // TODO: Add rotation logic here

  // Helper to render a face as a 3x3 grid
  function renderFace(face: Face) {
    return (
      <div className="grid grid-cols-3 gap-0">
        {cube[face].map((cell, i) => (
          <div
            key={i}
            className={`w-11 h-11 border border-gray-800`}
            style={{ background: faceColors[cell as Face] }}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Exploded 2D view */}
      <div className="flex flex-col items-center">
        {/* Up face */}
        <div className="h-33" />
        <div className="-ml-33">{renderFace("U")}</div>
        {/* Middle row: L F R B */}
        <div className="flex">
          <div>{renderFace("L")}</div>
          <div>{renderFace("F")}</div>
          <div>{renderFace("R")}</div>
          <div>{renderFace("B")}</div>
        </div>
        {/* Down face */}
        <div className="-ml-33">{renderFace("D")}</div>
      </div>
      {/* TODO: Add buttons to rotate faces */}
    </div>
  );
}

export default RubiksCube;
