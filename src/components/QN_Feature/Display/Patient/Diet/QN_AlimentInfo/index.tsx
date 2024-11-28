'use client'
import QN_Table from "@/components/QN_Components/QN_Table";
import QN_TextArea from "@/components/QN_Components/QN_TextArea";
import QN_HeaderAlimentInfo from "./QN_HeaderAlimentInfo";
import QN_NutritionalTable from "./QN_NutritionalTable";
import { IoClose } from '@/icons/'
import { useState } from "react";
import { IAliment } from "@/models/Aliment.interface";
import { usePopUp } from "@/components/QN_Components/QN_PopUp/popup.context";

interface QN_AlimentInfoProps {
	aliment: IAliment | null,
}

export default function QN_AlimentInfo({ aliment }: QN_AlimentInfoProps) {
	const { closePopUp } = usePopUp()
	const [nutritionalInfo, setNutritionalInfo] = useState([
		{ label: "Valor energético", portion: "-", quantity: "01" },
		{ label: "Carboidratos", portion: "-", quantity: "02" },
		{ label: "Proteínas", portion: "-", quantity: "03" },
		{ label: "Gorduras Totais", portion: "-", quantity: "04" },
		{ label: "Gorduras Saturadas", portion: "-", quantity: "05" },
		{ label: "Fibra Alimentar", portion: "-", quantity: "06" },
		{ label: "Sódio", portion: "-", quantity: "07" },
	])
	console.log(aliment);

	return (
		<div
			style={{
				backgroundColor: "#EAEAEA",
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				padding: "25px",
				alignItems: "center",
				flexDirection: "row",
				gap: '20px'
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '70%',
					gap: '5px',
				}}
			>
				<QN_HeaderAlimentInfo name={aliment?.name || ''} />
				<QN_NutritionalTable
					bgColor='#55b7fe'
					values={nutritionalInfo}
					columns={['Porção de 100g', 'Quantidade/Unidade']}
				/>
				<QN_TextArea
					value=""
					onChange={() => null}
					label="Observações do alimento:"
					maxRows={7}
					minRows={7}
					fontColorLabel="#55b7fe"
					fontSizeLabel="18px"
					fontWeightLabel="600"
				/>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '35%',
					height: '100%',
					justifyContent: 'space-around',
					alignItems: 'center',
					gap: '15px',
					paddingTop: '10px'
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'end',
						alignItems: 'end',
						width: '100%',
						height: '5%'
					}}
				>
					<IoClose size={35} cursor={'pointer'} onClick={closePopUp} />
				</div>

				<div
					style={{
						height: '45%',
						width: '100%',

					}}
				>
					<QN_NutritionalTable
						bgColor="#EAEAEA"
						removeHeadTable={true}
						bgRowHeader='#eaeaea'
						fontColorHead="black"
						label="Proporção Nutricional na Refeição"
						values={nutritionalInfo}
						columns={['Atual + Esse alimento']}
					/>
				</div>
				<div
					style={{
						height: '50%',
						width: '100%',
						padding: '0px'
					}}
				>
					<QN_NutritionalTable
						bgColor="#EAEAEA"
						removeHeadTable={true}
						bgRowHeader='#eaeaea'
						fontColorHead="black"
						label="Proporção Nutricional na Dieta Inteira"
						values={nutritionalInfo}
						columns={['Atual + Esse alimento']}
					/>
				</div>
			</div>

		</div>
	);
}
