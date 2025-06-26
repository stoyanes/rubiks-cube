import { Cube } from "./features/cube";
import { Timer } from "./features/timer";

const App = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-10">
        Rubik's Cube Visualizer
      </h1>
      <Cube />
      <Timer />
    </>
  );
};

export default App;
