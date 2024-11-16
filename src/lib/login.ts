import axios from './axiosInstance'

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
    const response = await axios.post<ILoginResponse>(`auth/login/${path}`, {
        email: data.email,
        password: data.password,
    })

    return {
        status: response.status,
        ...response.data
    }
}
