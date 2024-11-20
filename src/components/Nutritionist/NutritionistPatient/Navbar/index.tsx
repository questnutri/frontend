import QN_Navbar from "@/components/QN_Navbar"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import QN_NutritionistPatient_Navbar_Header from "./header"
import QN_NutritionistPatient_Navbar_Footer from "./footer"
import {NavbarItemType} from '../../../QN_Navbar/navbar.context'

export default function QN_NutritionistPatient_Navbar({items}: {items?: NavbarItemType[]}) {
    return (
        <QN_Navbar 
            header={<QN_NutritionistPatient_Navbar_Header />}
            items={items}
            footer={<QN_NutritionistPatient_Navbar_Footer />}
            setFirstSelected={0}
        />
    )
}