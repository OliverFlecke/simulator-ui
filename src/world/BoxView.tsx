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
			{String.fromCharCode((box.type ?? 0) + 97)}
		</div>
	)
}

export default BoxView
