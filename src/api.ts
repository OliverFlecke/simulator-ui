const url = "http://localhost:8080";

export function getEventSource(): EventSource {
  return new EventSource(`${url}/stream`);
}

export async function getStaticMap(): Promise<World> {
  return await fetch(`${url}/simulation/map`).then((x) => x.json());
}

export interface Location {
  x: number;
  y: number;
}

// export enum GridType {
//   EMPTY = " ",
//   WALL = "#",
// }

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
