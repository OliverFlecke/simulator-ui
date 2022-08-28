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

export function startSimulation(level: string): Promise<string> {
	return fetch(`${url}/simulation/create`, {
		method: "POST",
		body: JSON.stringify({
			level,
		}),
	}).then(async r => {
		if (r.ok) {
			return r.text()
		} else {
			throw new Error(await r.text())
		}
	})
}

export function getLevels(): Promise<string[]> {
	return fetch(`${url}/level`)
		.then(x => x.text())
		.then(x => x.split("\n"))
}

export interface Location {
	x: number
	y: number
}

export function locationToString(location: Location): string {
	return `${location.x},${location.y}`
}

export interface Agent {
	location: Location
	callsign?: number
}

export interface Box {
	location: Location
	type?: string
}

export interface Goal {
	location: Location
	type?: string
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
						type: (m.groups["id"].charCodeAt(0) - 97).toString(),
						location,
					})
					break
				case "goal":
					state.goals.push({
						type: (m.groups["id"].charCodeAt(0) - 97).toString(),
						location,
					})
					break
			}
		}
	})

	return state
}
