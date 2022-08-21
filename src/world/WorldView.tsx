import React, { useEffect, useState } from "react";
import { getEventSource, getStaticMap, World, WorldState } from "../api";
import AgentView from "./AgentView";
import BoxView from "./BoxView";
import GoalView from "./GoalView";
import { Grid } from "./Grid";

const WorldView = () => {
  const [world, setWorld] = useState<World | null>(null);
  const [state, setState] = useState<WorldState | null>(null);

  useEffect(() => {
    getStaticMap().then((w) => {
      setWorld(w);
      setState(w.state);

      const source = getEventSource();
      source.addEventListener("move", (e) => {
        const data = JSON.parse(e.data) as WorldState;
        setState(data);
      });
    });
  }, [state]);

  if (!world || !state) {
    return null;
  }

  return (
    <>
      <Grid grid={world.grid}>
        {state.agents.map((a) => (
          <AgentView key={a.callsign} agent={a} />
        ))}
        {state.boxes.map((b) => (
          <BoxView key={`${b.type}+${b.location}`} box={b} />
        ))}
        {state.goals.map((g) => (
          <GoalView key={`${g.type}+${g.location}`} goal={g} />
        ))}
      </Grid>
    </>
  );
};

export default WorldView;
