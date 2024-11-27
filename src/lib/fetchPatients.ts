import { IPatient } from "@/models/Patient/Patient.interface"
import { fetchWithAuth } from "./fetchWithAuth"

export const fetchPatients = async (): Promise<IPatient[]> => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient`, {
            method: 'GET',
        })

        if (response.ok) {
            return await response.json()
        }

        return []
    } catch (error) {
        console.error('Error fetching patients:', error)
        return []
    }
}

interface IFetchOnePatientResponse {
    status: number
    data?: IPatient
}

export const fetchOnePatient = async (id: string): Promise<any> => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${id}`, {
            method: 'GET',
        })

        if (response.status !== 200) {
            throw new Error('Could not fetch patient data')
        }

        return {
            status: response.status,
            data: await response.json()
        }

    } catch (error) {
        console.error(error)
        throw new Error('Could not fetch patient')
    }
}

export const updateOnePatient = async (id: string, data: Partial<IPatient>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })

        console.log(await response.json())

    } catch (error) {

    }
}