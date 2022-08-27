import React, { useEffect, useState } from "react";
import World from "./world/WorldView";
import "./App.css";
import { startSimulation } from "./api";

function App() {
  const [sim, setSim] = useState<string>();

  useEffect(() => {
    startSimulation().then(setSim);
  }, []);

  if (!sim) {
    return <div>No simulation has been started yet</div>;
  }

  console.log(`Got simulation id: ${sim}`);

  return <World simulation={sim} />;
}

export default App;
