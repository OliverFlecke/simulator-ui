import React, { FC } from "react"

const Cell: FC<{
	type: string
	x: number
	y: number
}> = ({ type, x, y }) => {
	const style = {
		gridColumn: x,
		gridRow: y,
	}

	switch (type) {
		case "#":
			return <div style={style} className="cell wall"></div>

		default:
			return <div style={style} className="cell"></div>
	}
}

export default Cell
