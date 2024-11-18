export interface ILogoutResponse {
    status?: number
    error?: string
}

export const logout = async (path: string): Promise<ILogoutResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/auth/logout/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    })

    const responseData = await response.json()

    return {
        status: response.status,
        ...responseData,
    }
}
