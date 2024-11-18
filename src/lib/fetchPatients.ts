import { fetchWithAuth } from "./fetchWithAuth"

export interface IPatientData {
    id: string
    name: string
    email: string
    diets?: string
}

export const fetchPatients = async (): Promise<IPatientData[]> => {
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

export const fetchOnePatient = async (id: string): Promise<IPatientData> => {
    console.log(id)
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${id}`, {
            method: 'GET',
        })

        if (response.ok) {
            const data: IPatientData = await response.json()
            console.log(data)
            return data
        }

        throw new Error('Could not fetch patient data')
    } catch (error) {
        console.error(error)
        throw new Error('Could not fetch patient')
    }
}
