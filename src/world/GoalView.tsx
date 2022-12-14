import React, { FC } from "react"
import { Goal } from "../api"

const GoalView: FC<{ goal: Goal }> = ({ goal }) => {
	return (
		<div
			className="goal"
			style={{
				gridColumn: goal.location.x + 1,
				gridRow: goal.location.y + 1,
			}}
		>
			{String.fromCharCode((goal.type ?? 0) + 65)}
		</div>
	)
}

export default GoalView
