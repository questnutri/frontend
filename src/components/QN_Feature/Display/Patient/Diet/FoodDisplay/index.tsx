import { useModal } from "@/components/QN_Components/QN_Modal/modal.context";
import FoodDisplay_Component from "./component";
import { useEffect, useState } from "react";



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