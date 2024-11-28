import IAllergy from "@/models/Patient/Health/Allergies.interface"
import { fetchWithAuth } from "../fetchWithAuth"

export const createAllergy = async (patientId: string, data: Partial<IAllergy>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${patientId}/allergy`, {
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

export const updateAllergy = async (patientId: string, allergyId: string, data: Partial<IAllergy>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${patientId}/allergy/${allergyId}`, {
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

export const deleteAllergy = async (patientId: string, allergyId: string) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${patientId}/allergy/${allergyId}`, {
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