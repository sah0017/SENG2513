// src/App.js
import "./App.css";
import Navbar from "./Navbar";
import Timer from "./Timer"
import Notes from "./Notes"
import Guides from "./Guides"

function App() {
  return (
    <>
      <Navbar />
      <div class="divider">
        <div class="page">
          <div id="notes">
            <Notes />
          </div>
          <div id="timer">
            <Timer />
          </div>
        </div>
        <div id="guides" class="page">
          <Guides />
        </div>
      </div>
    </>
  );
}
export default App;

