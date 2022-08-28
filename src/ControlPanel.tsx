import React, { useCallback, useEffect, useRef, useState } from "react"
import { getLevels, startSimulation } from "./api"

const ControlPanel: React.FC<{
	simulationId?: string
	setSimulationId: (id?: string) => void
}> = ({ simulationId, setSimulationId }) => {
	const levelRef = useRef<HTMLInputElement>(null)

	const clearSimulation = useCallback(
		() => setSimulationId(),
		[setSimulationId]
	)
	const startNewSimulation = useCallback(
		(level: string) => {
			startSimulation(level)
				.then(setSimulationId)
				.catch(err => alert(err))
		},
		[setSimulationId]
	)

	const onStartSimulationClicked = useCallback(() => {
		if (levelRef.current?.value) {
			startNewSimulation(levelRef.current.value)
		}
	}, [startNewSimulation])
	const onKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				onStartSimulationClicked()
			}
		},
		[onStartSimulationClicked]
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
			<button onClick={onStartSimulationClicked}>
				Start new simulation
			</button>
			<span
				className="cursor-pointer text-sm"
				onClick={e =>
					navigator.clipboard.writeText(e.currentTarget.innerText)
				}
			>
				{simulationId}
			</span>
			<button onClick={clearSimulation}>Clear</button>
			{!simulationId && (
				<div>
					<h3 className="pb-2 text-xl font-semibold text-green-400">
						Select level to run
					</h3>
					<LevelList startSimulation={startNewSimulation} />
				</div>
			)}
		</div>
	)
}

export default ControlPanel

const LevelList: React.FC<{ startSimulation: (level: string) => void }> = ({
	startSimulation,
}) => {
	const [levels, setLevels] = useState<string[]>()

	useEffect(() => {
		getLevels().then(setLevels)
	}, [])

	if (!levels) {
		return <></>
	}

	return (
		<ul>
			{levels.map(level => (
				<li
					key={level}
					onClick={() => startSimulation(level)}
					className="cursor-pointer rounded px-4 py-1 odd:bg-gray-800"
				>
					{level.replace(".map", "")}
				</li>
			))}
		</ul>
	)
}
