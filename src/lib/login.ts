export interface ILoginRequest {
    email: string
    password: string
}

export interface ILoginResponse {
    token?: string
    status?: number
    error?: string
}

export const login = async (path: string, data: ILoginRequest): Promise<ILoginResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `http://localhost:3030/api/v1`}/auth/login/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
        }),
    })

    try {
        const responseData = await response.json()
        return {
            status: response.status,
            ...responseData,
        }
    } catch (error) {
        return {
            status: response.status
        }
    }


}
