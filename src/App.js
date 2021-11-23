import "./App.css";
import Calender from "./Components/Calender/Calender";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="App"
    >
      <Calender />
    </div>
  );
}

export default App;
