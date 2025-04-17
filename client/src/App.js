// src/App.js
import "./App.css";
import Timer from "./Timer"
import Notes from "./Notes"
import Guides from "./Guides"

function App() {
  return (
    <>
      <div className="divider">
        <div className="left-side">
          <div id="notes">
            <Notes />
          </div>
          <div id="timer">
            <Timer />
          </div>
        </div>
        <div id="guides" className="page">
          <Guides />
        </div>
      </div>
    </>
  );
}
export default App;
