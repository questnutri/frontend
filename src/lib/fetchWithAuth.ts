const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('authToken='))?.split('=')[1]
        return token || null
    }
    return null
}

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = getAuthToken()

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    }

    const response = await fetch(url, { ...options, headers })

    return response
}