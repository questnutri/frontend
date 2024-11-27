import { IMeal } from "@/models/Patient/Diet/Diet.interface"
import { fetchWithAuth } from "../fetchWithAuth"

export const duplicatePatientMeal = async (idPatient: string, idDiet: string, data: Partial<IMeal>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${idPatient}/diet/${idDiet}/meal/`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
    } catch (error) {
        
    }
}