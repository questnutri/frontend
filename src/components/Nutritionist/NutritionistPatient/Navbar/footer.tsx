import QN_Button from "@/components/QN_Button";
import { useModal } from "@/components/QN_Modal/modal.context";

export default function QN_NutritionistPatient_Navbar_Footer() {
    const {closeModal} = useModal()
    return (
        <QN_Button colorStyle='red' onClick={closeModal}>Fechar</QN_Button> 
    )
}