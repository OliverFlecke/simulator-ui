import React, { FC } from "react"
import { Box } from "../api"

const BoxView: FC<{ box: Box }> = ({ box }) => {
	return (
		<div
			className="box"
			style={{
				gridColumn: box.location.x + 1,
				gridRow: box.location.y + 1,
			}}
		>
			{box.type}
		</div>
	)
}

export default BoxView
