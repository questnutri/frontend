import { use, useEffect, useState } from "react";
import { FaEdit } from "../../../icons/index";
import QN_MealGeneralInfo from "./QN_AlimentGeneralInfo";
import QN_Modal from "../QN_Modal";
import QN_AlimentInfo from "../QN_AlimentInfo";
import { useModal } from "../QN_Modal/modal.context";
import QN_Button from "../QN_Button";


export default function MealDisplay_FoodComponent() {
	const {setBlockModal} = useModal()
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		if(!openModal) {
			if(setBlockModal) setBlockModal(false)
		}
	}, [openModal])

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				width: "100%",
				backgroundColor: "#EAEAEA",
				height: "40px",
				borderRadius: "10px",
			}}
			onClick={() => {
				if(setBlockModal) setBlockModal(true)
				setOpenModal(true)
			}}
		>
			<div
				style={{
					display: "flex",
					width: "fit-content",
					justifyContent: "start",
					padding: "10px",
					color: "#55b7fe",
					gap: "8px",
					alignItems: "center",
				}}
			>
				<FaEdit color="#55b7fe" size={20} />
				<h1
					style={{
						fontSize: "14px",
						fontWeight: "600",
					}}
				>
					Nome do alimento
				</h1>
			</div>
			{<QN_MealGeneralInfo />}
			<QN_Modal isOpen={openModal} setOpen={setOpenModal} blockOutsideClose={false}>
					<Test />
			</QN_Modal>
		</div>
	)
}

function Test(){
	const {setBlockModal, closeModal} = useModal()
	useEffect(() => {
		if(setBlockModal) setBlockModal(false)
	}, [])
	return (
		<>
			<QN_Button onClick={closeModal}>Fechar</QN_Button>
		</>
		
	)
}
