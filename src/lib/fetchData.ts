import { fetchWithAuth } from "./fetchWithAuth"

export interface IUserData {
    role: 'nutritionist' | 'patient' | 'admin'
    name: string
    email: string
}

export const fetchData = async (role: 'nutritionist' | 'patient' | 'admin'): Promise<void> => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/${role}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            const data: IUserData = await response.json()
            localStorage.setItem('role', role)
            localStorage.setItem('user', JSON.stringify({
                name: data.name,
                email: data.email,
            }))
        }
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}
