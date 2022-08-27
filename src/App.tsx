import React, { useState } from "react"
import ControlPanel from "./ControlPanel"
import World from "./world/WorldView"

function App() {
	const [simulation, setSimulation] = useState<string>()

	return (
		<main className="flex h-screen flex-col">
			<ControlPanel
				simulationId={simulation}
				setSimulationId={setSimulation}
			/>
			{!!simulation && <World simulation={simulation} />}
		</main>
	)
}

export default App
