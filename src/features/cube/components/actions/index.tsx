import type { Face, RotationDirection } from "../../../../types";
import FaceRotationButtons from "./FaceRotationButtons";

type ActionsProps = {
  onRotate: (face: Face, direction: RotationDirection) => void;
  onReset: () => void;
};

const Actions = ({ onRotate, onReset }: ActionsProps) => (
  <>
    <FaceRotationButtons onRotate={onRotate} />
    <button
      onClick={onReset}
      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      Reset Cube
    </button>
  </>
);

export default Actions;
