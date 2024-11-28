import { SetStateAction, use, useEffect, useState } from "react";
import { FaEdit } from "@/icons/index";
import QN_MealGeneralInfo from "./QN_AlimentGeneralInfo";
import { useModal } from "@/components/QN_Components/QN_Modal/modal.context";
import QN_Button from "@/components/QN_Components/QN_Button";
import FoodDisplay_Component from "./component";



export default function FoodDisplay() {
	const { setBlockModal } = useModal()
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		if (!openModal) {
			if (setBlockModal) setBlockModal(false)
		}
	}, [openModal])

	return (
		<FoodDisplay_Component />
	)
}