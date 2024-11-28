"use client";

import { col } from "framer-motion/client";

interface QN_TableBodyProps {
	columns: string[],
	values: Array<{
		label: string;
		portion?: string;
		quantity?: string;
	}>;
	bgColorRowHead?: string
	fontColorHead?: string
}

export default function QN_TableBody({ columns, values, bgColorRowHead: bgColor = '#55b7fe', fontColorHead = 'white' }: QN_TableBodyProps) {

	return (
		<div>
			<div
				style={{
					width: 'fit-content',
					marginLeft: 'auto',
					height: '20px',
					display: 'flex',
					justifyContent: 'end',
					alignItems: 'center',
					fontSize: '13px',
					gap: '40px'
				}}
			>
				{columns.map((column, index) => (
					<h1
						key={index}
						style={{
							color: `${fontColorHead}`
						}}
					>
						{column}
					</h1>
				))}
			</div>
			<div
				style={{
					width: "100%",
					backgroundColor: "white",
					color: "black",
					border: '1px solid black',
					borderRadius: '10px'
				}}
			>
				<table
					style={{
						width: "100%",
						height: '30%',

					}}
				>
					<tbody
						style={{
							fontSize: "13px",
						}}
					>
						{values.map((row, index) => (
							<tr
								key={index}
								style={{
									borderBottom: values.length === index + 1 ? "none" : "1px solid black"
								}}
							>
								<td
									style={{
										padding: "4px",
										textAlign: "left",
										width: '50%'
									}}
								>
									{row.label}
								</td>
								{columns.length > 1 && (
									<td style={{ textAlign: "center" }}>{row.quantity}</td>
								)}
								<td style={{ textAlign: "center" }}>{row.portion}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
