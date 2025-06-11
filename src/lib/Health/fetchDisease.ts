import IDisease from "@/models/Patient/Health/Diseases.interface"
import { fetchWithAuth } from "../fetchWithAuth"
import { nutritionistPatient } from "../routes"

export const createDisease = async (patientId: string, data: Partial<IDisease>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/${nutritionistPatient}/${patientId}/disease`, {
            method: 'POST',
            body: JSON.stringify(data)
        })

        return {
            status: response.status,
            data: await response.json()
        }

    } catch (error) {
        return {
            status: 500,
            data: 'Application error'
        }
    }
}

export const updateChronic = async (patientId: string, diseaseId: string, data: Partial<IDisease>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/${nutritionistPatient}/${patientId}/disease/${diseaseId}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })

        return {
            status: response.status,
            data: await response.json()
        }

    } catch (error) {
        return {
            status: 500,
            data: 'Application error'
        }
    }
}

export const deleteChronic = async (patientId: string, diseaseId: string) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/${nutritionistPatient}/${patientId}/disease/${diseaseId}`, {
            method: 'DELETE',
        })

        return {
            status: response.status,
            data: await response.json()
        }

    } catch (error) {
        return {
            status: 500,
            data: 'Application error'
        }
    }
}