import React, { useEffect, useState } from "react";
import { getStaticMap, World } from "../api";
import AgentView from "./AgentView";
import BoxView from "./BoxView";
import GoalView from "./GoalView";
import { Grid } from "./Grid";

const WorldView = () => {
  const [world, setWorld] = useState<World | null>(null);
  useEffect(() => {
    getStaticMap().then(setWorld);
  }, []);

  if (!world) {
    return null;
  }

  return (
    <>
      <Grid grid={world.grid}>
        {world.world.agent.map((a) => (
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
