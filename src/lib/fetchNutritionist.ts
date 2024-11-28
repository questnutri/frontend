import { INutritionist } from '../models/Nutritionist.interface'
import { fetchWithAuth } from "./fetchWithAuth"

export const fetchNutritionist = async (): Promise<any> => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/`, {
            method: 'GET',
        })

        if (response.status !== 200) {
            throw new Error('Could not fetch nutritionist data')
        }

        return {
            status: response.status,
            data: await response.json()
        }

    } catch (error) {
        console.error(error)
        throw new Error('Could not fetch nutritionist')
    }
}

export const postNutritionist = async (data: Partial<INutritionist>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        console.log(await response.json())
    } catch (error) {
        console.error(error)
    }
}

export const updateNutritionist = async (data: Partial<INutritionist>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })

        console.log(await response.json())

    } catch (error) {

    }
}