import axiosInstance from 'axios'

const axios = axiosInstance.create({
    baseURL: 'https://backend-ssj4.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
})

export default axios