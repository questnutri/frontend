import { findCookie } from "./findCookie"

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = findCookie('authToken')

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    }

    const response = await fetch(url, { ...options, headers })

    return response
}