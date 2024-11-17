import axios from './axiosInstance'

export interface ILogoutResponse {
    status?: number
    error?: string
}


export const logout = async (path: string): Promise<ILogoutResponse> => {
    const response = await axios.post<ILogoutResponse>(`auth/logout/${path}`, {})

    return {
        status: response.status,
        ...response.data
    }

}
