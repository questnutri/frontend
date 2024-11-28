import IMedication from "@/models/Patient/Health/Medication.interface"
import { fetchWithAuth } from "../fetchWithAuth"

export const createMedication = async (patientId: string, data: Partial<IMedication>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${patientId}/medication`, {
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

export const updateMedication = async (patientId: string, medicationId: string, data: Partial<IMedication>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${patientId}/medication/${medicationId}`, {
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

export const deleteMedication = async (patientId: string, medicationId: string) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${patientId}/medication/${medicationId}`, {
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