import React, { useCallback } from "react"
import { startSimulation } from "./api"

const ControlPanel: React.FC<{
	simulationId?: string
	setSimulationId: (id: string) => void
}> = ({ simulationId, setSimulationId }) => {
	const startNewSimulation = useCallback(() => {
		startSimulation().then(setSimulationId)
	}, [setSimulationId])

	return (
		<div>
			<button onClick={startNewSimulation}>Start new simulation</button>
			<span
				onClick={e =>
					navigator.clipboard.writeText(e.currentTarget.innerText)
				}
			>
				{simulationId}
			</span>
		</div>
	)
}

export default ControlPanel
