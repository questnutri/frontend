
import { IUser } from "@/models/User.interface"
import { fetchWithAuth } from "./fetchWithAuth"

export const fetchData = async (role: 'nutritionist' | 'patient' | 'admin'): Promise<void> => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/${role}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            const data: IUser = await response.json()
            localStorage.setItem('user', JSON.stringify({
                firstName: data.firstName,
                email: data.email,
            }))
        }
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}
