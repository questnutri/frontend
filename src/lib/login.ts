import axios from './axiosInstance'

export interface ILoginRequest {
    email: string
    password: string
}

export interface ILoginResponse {
    code: number
    token: string
}

export const login = async (data: ILoginRequest): Promise<ILoginResponse> => {
    const response = await axios.post<ILoginResponse>('/auth/login/admin', {
        email: data.email,
        password: data.password,
    })

    console.log(response.data)
    return response.data
}
