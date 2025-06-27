import { useEffect, useRef, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const handleStart = () => setRunning(true);
  const handlePause = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    setSeconds(0);
  };

  return (
    <div className="flex flex-col items-center my-4">
      <div className="text-2xl font-mono mb-2" data-testid="timer-value">
        {seconds}s
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleStart}
          disabled={running}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Start
        </button>
        <button
          type="button"
          onClick={handlePause}
          disabled={!running}
          className="px-3 py-1 bg-yellow-500 text-white rounded"
        >
          Pause
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
