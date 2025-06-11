import { useModal } from "@/components/QN_Components/QN_Modal/modal.context";
import FoodDisplay_Component from "./component";
import { useEffect, useState } from "react";
import { Food, Meal } from "@/utils/interfaces/Diet.interfaces";



export default function FoodDisplay({food, meal}: {food?: Food, meal?: any}) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<FoodDisplay_Component foodPassed={food} mealPassed={meal}/>
	)
}