import { useState } from "react";
import "./App.css";
import Cube from "./components/Cube";
import { createSolvedCube, rotateFace } from "./lib/rotationEngine";
import { faceNames, type Face, type RotationDirection } from "./types";

const faces: Face[] = Object.keys(faceNames) as Face[];

const App = () => {
  const [cube, setCube] = useState(createSolvedCube());

  const handleRotate = (face: Face, direction: RotationDirection) => {
    setCube((prev) => rotateFace(prev, face, direction));
  };

  return (
    <>
      <Cube cube={cube} />
      <div style={{ margin: "1rem" }}>
        {/* Clockwise buttons row */}
        <div
          style={{ display: "flex", gap: "0.75rem", marginBottom: "0.5rem" }}
        >
          {faces.map((face) => (
            <button
              key={`${face}-clockwise`}
              onClick={() => handleRotate(face, "clockwise")}
              style={{ padding: "0.5rem 1rem" }}
              title={`${faceNames[face]} clockwise`}
            >
              {face}
            </button>
          ))}
        </div>
        {/* Counter clockwise buttons row */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {faces.map((face) => (
            <button
              key={`${face}-counterclockwise`}
              onClick={() => handleRotate(face, "counterclockwise")}
              style={{ padding: "0.5rem 1rem" }}
              title={`${faceNames[face]} counterclockwise`}
            >
              {face}'
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
