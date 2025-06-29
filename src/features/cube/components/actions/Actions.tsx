import {
  faceNames,
  type Face,
  type RotationDirection,
} from "../../../../types";

type ActionsProps = {
  onRotate: (face: Face, direction: RotationDirection) => void;
  onReset: () => void;
};

const faces: Face[] = Object.keys(faceNames) as Face[];

const Actions = ({ onRotate, onReset }: ActionsProps) => (
  <>
    <div className="m-4" data-testid="face-rotation-buttons">
      {/* Clockwise buttons row */}
      <div className="flex gap-3 mb-2">
        {faces.map((face) => (
          <button
            type="button"
            key={`${face}-clockwise`}
            onClick={() => onRotate(face, "clockwise")}
            className="min-w-[75px] rounded-lg border border-transparent px-5 py-2 text-base font-medium bg-[#1a1a1a] text-white cursor-pointer transition-colors hover:border-[#646cff]"
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
            type="button"
            key={`${face}-counterclockwise`}
            onClick={() => onRotate(face, "counterclockwise")}
            className="min-w-[75px] rounded-lg border border-transparent px-5 py-2 text-base font-medium bg-[#1a1a1a] text-white cursor-pointer transition-colors hover:border-[#646cff]"
            title={`${faceNames[face]} counterclockwise`}
          >
            {face}'
          </button>
        ))}
      </div>
    </div>
    <button
      type="button"
      onClick={onReset}
      className="min-w-[75px] rounded-lg border border-transparent px-5 py-2 text-base font-medium bg-[#1a1a1a] text-white cursor-pointer transition-colors hover:border-[#646cff]"
    >
      Reset Cube
    </button>
  </>
);

export default Actions;
