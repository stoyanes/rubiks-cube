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
      type="button"
      onClick={onReset}
      className="min-w-[75px] rounded-lg border border-transparent px-5 py-2 text-base font-medium bg-[#1a1a1a] text-white cursor-pointer transition-colors hover:border-[#646cff]"
    >
      Reset Cube
    </button>
  </>
);

export default Actions;
