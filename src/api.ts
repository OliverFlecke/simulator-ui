const url = "http://localhost:8080";

export function getEventSource(id: string): EventSource {
  return new EventSource(`${url}/simulation/${id}/stream`);
}

export async function getStaticMap(id: string): Promise<World> {
  return await fetch(`${url}/simulation/${id}/map`).then((x) => x.json());
}

export async function startSimulation(): Promise<string> {
  return await fetch(`${url}/simulation/create`, {
    method: "POST",
  }).then((r) => r.json());
}

export interface Location {
  x: number;
  y: number;
}

export interface Agent {
  location: Location;
  callsign: number;
}

export interface Box {
  location: Location;
  type: number;
}

export interface Goal {
  location: Location;
  type: number;
}

export interface WorldState {
  agents: Agent[];
  boxes: Box[];
  goals: Goal[];
}

export interface World {
  grid: string;
  state: WorldState;
}
