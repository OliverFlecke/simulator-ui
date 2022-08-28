import React, { useCallback, useRef } from "react"
import { startSimulation } from "./api"

const ControlPanel: React.FC<{
	simulationId?: string
	setSimulationId: (id: string) => void
}> = ({ simulationId, setSimulationId }) => {
	const levelRef = useRef<HTMLInputElement>(null)
	const startNewSimulation = useCallback(() => {
		if (levelRef.current?.value) {
			startSimulation(levelRef.current.value)
				.then(setSimulationId)
				.catch(err => alert(err))
		}
	}, [levelRef, setSimulationId])
	const onKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				startNewSimulation()
			}
		},
		[startNewSimulation]
	)

	return (
		<div className="px-4">
			<input
				ref={levelRef}
				className="rounded bg-gray-700 p-1"
				defaultValue="04.map"
				placeholder="Level name"
				onKeyDown={onKeyDown}
			/>
			<button onClick={startNewSimulation}>Start new simulation</button>
			<span
				className="cursor-pointer"
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
