'use client'
import QN_Table from "../QN_Table";
import QN_TextArea from "../QN_TextArea";
import QN_HeaderAlimentInfo from "./QN_HeaderAlimentInfo";
import QN_NutritionalTable from "./QN_NutritionalTable";
import { IoClose } from '../../../icons/index'
import { useState } from "react";

interface QN_AlimentInfoProps {
	name: string,
	isOpen: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function QN_AlimentInfo({ name, isOpen, setOpen }: QN_AlimentInfoProps) {
	const closeModal = () => setOpen(false)

	const [nutritionalInfo, setNutritionalInfo] = useState([
		{ label: "Valor energético", portion: "-", quantity: "01" },
		{ label: "Carboidratos", portion: "-", quantity: "02" },
		{ label: "Proteínas", portion: "-", quantity: "03" },
		{ label: "Gorduras Totais", portion: "-", quantity: "04" },
		{ label: "Gorduras Saturadas", portion: "-", quantity: "05" },
		{ label: "Fibra Alimentar", portion: "-", quantity: "06" },
		{ label: "Sódio", portion: "-", quantity: "07" },
	])

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
				<QN_HeaderAlimentInfo name={name} />
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
					<IoClose size={35} cursor={'pointer'} onClick={closeModal} />
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
