import axios from 'axios'
import { BASE_URL } from '../config'
import { logoff } from '../utils/utils'

const AxiosInstance = axios.create()

const getHeaders = () => {
    return {
        headers: {
            'x-auth-token': localStorage.getItem('x-auth-token') 
        }
    }
}

AxiosInstance.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status === 401) {
        logoff()
        window.location = '/login'
    }
    return Promise.reject(error)
})

export function getItems(url, needHeaders) {
    return AxiosInstance.get(BASE_URL + url, needHeaders ? getHeaders() : {})
}

export function putItems(url, data) {
    return AxiosInstance.put(BASE_URL + url, data, getHeaders())
}

export function postItems(url, data, needHeaders) {
    return AxiosInstance.post(BASE_URL + url, data, needHeaders ? getHeaders() : {})
}

export function deleteItems(url) {
    return AxiosInstance.delete(BASE_URL + url, getHeaders())
}