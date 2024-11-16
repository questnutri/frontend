import axiosInstance from 'axios'

const axios = axiosInstance.create({
    baseURL: 'http://localhost:3030/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    validateStatus: (status) => {
        return status < 500
    },
})

export default axios