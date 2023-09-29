import axios from 'axios'
export const api = axios.create({
    baseURL: 'http://localhost:5012/api'
})
api.interceptors.request.use((config) => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
        config.headers['token'] = authToken;
    }
    return config;
});
api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        console.log(error)
        if (error?.response?.status == 401) {
            localStorage.removeItem('token')
            return window.location.replace('/user/register')
        }
        return Promise.reject(error)
    }
)