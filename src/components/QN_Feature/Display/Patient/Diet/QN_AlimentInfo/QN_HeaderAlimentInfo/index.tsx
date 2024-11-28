'use client'
import QN_Button from "@/components/QN_Components/QN_Button";
import QN_Input from "@/components/QN_Components/QN_Input";
import { FaTrash, FaSearch } from "@/icons/"


interface QN_HeaderAlimentInfoProps {
	name: string
}

export default function QN_HeaderAlimentInfo({ name }: QN_HeaderAlimentInfoProps) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				gap: '5px'
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					width: "100%",
					gap: '15px'
				}}
			>
				<h1
					style={{
						width: "60%",
						color: "#55b7fe",
						fontSize: "2vw",
						fontWeight: "600",
					}}
				>
					{name}
				</h1>
				<div
					style={{
						width: "10%",
						display: "flex",
						alignItems: "center",
						justifyContent: "start",
					}}
				>
					<FaTrash size={25} cursor={'pointer'} />
				</div>
				<div
					style={{
						width: '30%'
					}}
				>
					<QN_Button width="100%">Salvar</QN_Button>
				</div>

			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%",
					gap: '20px',

				}}
			>
				<QN_Input
					value=""
					startContent={<FaSearch size={20} />}
					onChange={() => null}
					withBorder={true}
				/>
				<span>
					<QN_Input value="" onChange={() => null} placeHolder="quantidade" withBorder={true} />
				</span>
				<span>
					<QN_Input value="" onChange={() => null} placeHolder="unidade" withBorder={true} />
				</span>
			</div>
		</div>
	);
}
