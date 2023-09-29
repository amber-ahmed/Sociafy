import axios from 'axios'
export const api = axios.create({
    baseURL: '/api'
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
        if (error?.response?.status == 498) {
            const currentPath = window.location.pathname;
            let authPath = currentPath.split('/')
            authPath = authPath[1]
            localStorage.removeItem('token')
            if (authPath !== 'login' && authPath !== 'register' && authPath !== '')
                return window.location.replace('/login')
        }
        if (error?.response?.status == 401) {
            return window.location.replace('/login')
        }
        return Promise.reject(error)
    }
)