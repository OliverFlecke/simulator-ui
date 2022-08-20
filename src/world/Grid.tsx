import React, { FC } from "react";
import Cell from "./Cell";

export const Grid: FC<{ grid: string; children?: React.ReactNode }> = ({
  grid,
  children,
}) => {
  const rows = grid.split("\n");
  const l = rows[0].length;

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <InternalGrid columns={l} rows={rows.length}>
        {rows.flatMap((row, y) =>
          row.split("").map((c, x) => <Cell key={`${x},${y}`} type={c} />)
        )}
      </InternalGrid>
      <InternalGrid columns={l} rows={rows.length}>
        {children}
      </InternalGrid>
    </div>
  );
};

const InternalGrid: FC<{
  children: React.ReactNode;
  columns: number;
  rows: number;
}> = ({ children, columns, rows }) => {
  return (
    <div
      style={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        display: "grid",
        gap: "2px",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {children}
    </div>
  );
};
