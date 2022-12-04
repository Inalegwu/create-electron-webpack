import { useState } from "preact/hooks";

import ElectronLogo from "./assets/electron.svg";
import "./App.css";

export const App = () => {
  const [count, setCount] = useState(0);

  const handleOnClick = (url) => {
    window.myAPI.openExternal(url);
  };

  return (
    <div>
      <div>
        <img
          onClick={() => handleOnClick("https://electronjs.org/")}
          src={ElectronLogo}
          className="logo"
          alt="Electron logo"
        />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/web/App.jsx</code> to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Electron logo to learn more</p>
    </div>
  );
};
