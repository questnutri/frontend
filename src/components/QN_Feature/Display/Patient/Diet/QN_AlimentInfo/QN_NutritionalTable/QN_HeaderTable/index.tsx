import { FaPlus } from "@/icons/index"
export default function QN_HeaderTable() {
	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<h1
				style={{
					color: "white",
					fontSize: "16px",
					fontWeight: "600",
				}}
			>
				Informações Nutricionais
			</h1>
			<FaPlus color="white" size={30} cursor={'pointer'} />
		</div>
	);
}
