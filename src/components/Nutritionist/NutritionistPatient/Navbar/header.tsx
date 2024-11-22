import { useNutritionistPatient } from "@/context/modal.patient.context"

export default function QN_NutritionistPatient_Navbar_Header() {
    const { patient } = useNutritionistPatient()
    return (
        <>
            <h1 style={{fontSize: '25px'}}>
                {patient?.firstName}
            </h1>
            <h2 style={{fontSize: '15px'}}>
                ID: {patient?._id}
            </h2>

        </>

    )
}