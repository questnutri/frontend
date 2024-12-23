import { fetchWithAuth } from "./fetchWithAuth"
import { IAliment } from "@/models/Aliment.interface"

export const fetchAliments = async (): Promise<IAliment[]> => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/aliment/taco`, {
            method: 'GET',
        })

        const data = await response.json()
        if (response.ok) {
            return data
        }

        return []
    } catch (error) {
        return []
    }
}

export const fetchOneAliment = async (id: string): Promise<any> => {
    console.log(id)
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/aliment/taco/${id}`, {
            method: 'GET',
        })

        if (response.status !== 200) {
            throw new Error('Could not fetch aliment data')
        }

        return {
            status: response.status,
            data: await response.json()
        }

    } catch (error) {
        console.error(error)
        throw new Error('Could not fetch aliment')
    }
}