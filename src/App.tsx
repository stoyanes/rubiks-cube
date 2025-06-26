import { Cube } from "./features/cube";

const App = () => {
  return (
    <div className="mt-2">
      <h1 className="text-3xl font-bold text-white mb-10">
        Rubik's Cube Visualizer
      </h1>
      <Cube />
    </div>
  );
};

export default App;
