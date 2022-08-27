import React, { FC } from "react"
import { Agent } from "../api"

const AgentView: FC<{ agent: Agent }> = ({ agent }) => {
	return (
		<div
			className="agent"
			style={{
				gridColumn: agent.location.x + 1,
				gridRow: agent.location.y + 1,
			}}
		>
			{agent.callsign ?? "0"}
		</div>
	)
}

export default AgentView
