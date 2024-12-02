import { useModal } from "@/components/QN_Components/QN_Modal/modal.context";
import FoodDisplay_Component from "./component";
import { useEffect, useState } from "react";



export default function FoodDisplay() {
	const [openModal, setOpenModal] = useState(false);

	return (
		<FoodDisplay_Component />
	)
}