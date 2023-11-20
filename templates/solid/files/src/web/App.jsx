import { createSignal } from "solid-js";
import "./App.css";

export const App = () => {
  const [count, setCount] = createSignal(0);

  return (
    <div className="container">
      <h1>{count()}</h1>
      <button onClick={() => setCount(count() + 1)}>Count</button>
    </div>
  );
};
