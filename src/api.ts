const url = "http://localhost:8080"

export function getEventSource(id: string): EventSource {
	return new EventSource(`${url}/simulation/${id}/stream`)
}

export async function getStaticMap(id: string): Promise<World> {
	const parts = await fetch(`${url}/simulation/${id}/map`)
		.then(x => x.text())
		.then(level => level.split("\n\n"))

	return {
		grid: parts[0],
		state: getWorldState(parts[1]),
	}
}

export async function startSimulation(): Promise<string> {
	return await fetch(`${url}/simulation/create`, {
		method: "POST",
	}).then(r => r.text())
}

export interface Location {
	x: number
	y: number
}

export interface Agent {
	location: Location
	callsign: number
}

export interface Box {
	location: Location
	type: string
}

export interface Goal {
	location: Location
	type: string
}

export interface WorldState {
	agents: Agent[]
	boxes: Box[]
	goals: Goal[]
}

export interface World {
	grid: string
	state: WorldState
}

function getWorldState(content: string): WorldState {
	const state: WorldState = {
		agents: [],
		boxes: [],
		goals: [],
	}

	const pattern = /(?<type>[a-z]+) (?<id>\w) (?<x>\d+),(?<y>\d+)/

	content.split("\n").forEach(line => {
		const m = line.match(pattern)
		if (m?.groups) {
			const location = {
				x: Number.parseInt(m.groups["x"]),
				y: Number.parseInt(m.groups["y"]),
			}
			switch (m.groups["type"]) {
				case "agent":
					state.agents.push({
						callsign: Number.parseInt(m.groups["id"]),
						location,
					})
					break
				case "box":
					state.boxes.push({
						type: m.groups["id"],
						location,
					})
					break
				case "goal":
					state.goals.push({
						type: m.groups["id"],
						location,
					})
					break
			}
		}
	})

	return state
}
