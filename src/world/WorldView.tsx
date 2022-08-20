import React, { useEffect, useState } from "react";
import { Agent, getEventSource, getStaticMap, World } from "../api";
import AgentView from "./AgentView";
import BoxView from "./BoxView";
import GoalView from "./GoalView";
import { Grid } from "./Grid";

const WorldView = () => {
  const [world, setWorld] = useState<World | null>(null);
  const [agents, setAgents] = useState<Agent[] | null>(null);

  useEffect(() => {
    getStaticMap().then((w) => {
      setWorld(w);
      setAgents(w.world.agent);

      const source = getEventSource();
      source.addEventListener("move", (e) => {
        const agent = JSON.parse(e.data) as Agent;
        setAgents([agent]);
      });
    });
  }, [agents]);

  if (!world || !agents) {
    return null;
  }

  return (
    <>
      <Grid grid={world.grid}>
        {agents!.map((a) => (
          <AgentView key={a.callsign} agent={a} />
        ))}
        {world.world.box.map((b) => (
          <BoxView key={`${b.type}+${b.location}`} box={b} />
        ))}
        {world.world.goal.map((g) => (
          <GoalView key={`${g.type}+${g.location}`} goal={g} />
        ))}
      </Grid>
    </>
  );
};

export default WorldView;
