import axiosInstance from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || `http://localhost:${process.env.NEXT_PUBLIC_LOCAL_BACKEND_PORT || 3030}/api/v1`

const axios = axiosInstance.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 10000,
    validateStatus: (status) => {
        return status < 500
    },
})

axios.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('authToken='))
                ?.split('=')[1]

            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axios