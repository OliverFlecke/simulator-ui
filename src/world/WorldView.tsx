import React, { useEffect, useState } from "react"
import { getEventSource, getStaticMap, World, WorldState } from "../api"
import AgentView from "./AgentView"
import BoxView from "./BoxView"
import GoalView from "./GoalView"
import { Grid } from "./Grid"

const WorldView: React.FC<{ simulation: string }> = ({ simulation }) => {
	const [world, setWorld] = useState<World | null>(null)
	const [state, setState] = useState<WorldState | null>(null)

	useEffect(() => {
		getStaticMap(simulation).then(w => {
			setWorld(w)
			setState(w.state)

			const source = getEventSource(simulation)
			source.addEventListener("move", e => {
				const data = JSON.parse(e.data) as WorldState
				setState(data)
			})
			source.addEventListener("complete", () => {
				source.close()
			})
		})
	}, [simulation])

	if (!world || !state) {
		return null
	}

	return (
		<Grid grid={world.grid}>
			{state.goals.map(g => (
				<GoalView key={`${g.type}+${g.location}`} goal={g} />
			))}
			{state.boxes.map(b => (
				<BoxView key={`${b.type}+${b.location}`} box={b} />
			))}
			{state.agents.map(a => (
				<AgentView key={a.callsign} agent={a} />
			))}
		</Grid>
	)
}

export default WorldView
