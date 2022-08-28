import React, { FC } from "react"
import Cell from "./Cell"

export const Grid: FC<{ grid: string; children?: React.ReactNode }> = ({
	grid,
	children,
}) => {
	const rows = grid.split("\n")
	const l = rows.reduce((max, current) => Math.max(max, current.length), 0)

	return (
		<div className="relative h-full">
			<InternalGrid columns={l} rows={rows.length}>
				{rows.flatMap((row, y) =>
					row
						.split("")
						.map((c, x) => (
							<Cell
								key={`${x},${y}`}
								type={c}
								x={x + 1}
								y={y + 1}
							/>
						))
				)}
			</InternalGrid>
			<InternalGrid columns={l} rows={rows.length}>
				{children}
			</InternalGrid>
		</div>
	)
}

const InternalGrid: FC<{
	children: React.ReactNode
	columns: number
	rows: number
}> = ({ children, columns, rows }) => {
	return (
		<div
			className="world-grid"
			style={{
				gridTemplateColumns: `repeat(${columns}, 1fr)`,
				gridTemplateRows: `repeat(${rows}, 1fr)`,
			}}
		>
			{children}
		</div>
	)
}
