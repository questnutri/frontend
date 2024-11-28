import IDisease from "@/models/Patient/Health/Diseases.interface"
import { fetchWithAuth } from "../fetchWithAuth"

export const createDisease = async (patientId: string, data: Partial<IDisease>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${patientId}/disease`, {
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

export const updateMedication = async (patientId: string, diseaseId: string, data: Partial<IDisease>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${patientId}/disease/${diseaseId}`, {
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

export const deleteMedication = async (patientId: string, diseaseId: string) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${patientId}/disease/${diseaseId}`, {
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