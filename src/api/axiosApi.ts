import axios from 'axios'

const axiosApi = axios.create({
    baseURL: `/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export default axiosApi
