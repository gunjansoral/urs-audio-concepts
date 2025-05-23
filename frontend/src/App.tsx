import "./App.css";
import EQ from "./components/EQ";

function App() {
  const handleEqChange = (
    values: { frequency: number; gain: number; q: number }[]
  ) => {
    console.log("EQ values changed:", values);
  };

  return (
    <div className="app-container">
      <h1>URSAC</h1>
      <div className="eq-wrapper">
        <EQ audio="/audio.wav" onEqChange={handleEqChange} />
      </div>
    </div>
  );
}

export default App;
