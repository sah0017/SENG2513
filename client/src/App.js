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
      <Notes />
      <Timer />
      <Guides />
    </>
  );
}
export default App;

