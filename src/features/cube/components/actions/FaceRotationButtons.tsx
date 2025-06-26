import {
  faceNames,
  type Face,
  type RotationDirection,
} from "../../../../types";

interface FaceRotationButtonsProps {
  onRotate: (face: Face, direction: RotationDirection) => void;
}

const faces: Face[] = Object.keys(faceNames) as Face[];

const FaceRotationButtons = ({ onRotate }: FaceRotationButtonsProps) => (
  <div className="m-4">
    {/* Clockwise buttons row */}
    <div className="flex gap-3 mb-2">
      {faces.map((face) => (
        <button
          key={`${face}-clockwise`}
          onClick={() => onRotate(face, "clockwise")}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
          title={`${faceNames[face]} clockwise`}
        >
          {face}
        </button>
      ))}
    </div>
    {/* Counter clockwise buttons row */}
    <div className="flex gap-3">
      {faces.map((face) => (
        <button
          key={`${face}-counterclockwise`}
          onClick={() => onRotate(face, "counterclockwise")}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
          title={`${faceNames[face]} counterclockwise`}
        >
          {face}'
        </button>
      ))}
    </div>
  </div>
);

export default FaceRotationButtons;
