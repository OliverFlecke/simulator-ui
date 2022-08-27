import React, { useState } from "react"
import ControlPanel from "./ControlPanel"
import World from "./world/WorldView"

function App() {
	const [simulation, setSimulation] = useState<string>()

	return (
		<>
			<ControlPanel
				simulationId={simulation}
				setSimulationId={setSimulation}
			/>
			{!!simulation && <World simulation={simulation} />}
		</>
	)
}

export default App
