import React, { FC, useEffect, useState } from "react";
import { getStaticMap, World } from "./api";

const WorldView = () => {
  const [world, setWorld] = useState<World | null>(null);
  useEffect(() => {
    getStaticMap().then(setWorld);
  }, []);

  if (!world) {
    return null;
  }

  const rows = world.grid.split("\n");
  const l = rows[0].length;

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateColumns: `repeat(${l}, 1fr)`,
        gridTemplateRows: `repeat(${rows.length}, 1fr)`,
      }}
    >
      {rows.flatMap((row) => row.split("").map((c) => <Cell type={c} />))}
    </div>
  );
};

export default WorldView;

interface CellProps {
  type: string;
}
const Cell: FC<CellProps> = ({ type }) => {
  switch (type) {
    case "#":
      return <div className="cell wall"></div>;

    default:
      return <div className="cell"></div>;
  }
};
