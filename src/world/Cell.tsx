import React, { FC } from "react"

const Cell: FC<{
	type: string
}> = ({ type }) => {
	switch (type) {
		case "#":
			return <div className="cell wall"></div>

		default:
			return <div className="cell"></div>
	}
}

export default Cell
