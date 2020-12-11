import axios from 'axios'

import { BASE_URL } from '../config'

const AxiosInstance = axios.create()

const getHeaders = () => {
    return {
        headers: {
            'x-auth-token': localStorage.getItem('x-auth-token') 
        }
    }
}

AxiosInstance.interceptors.response.use((response) => {
    console.log('response', response)
    return response
}, (error) => {
    if (error.response.status === 401) {
        console.log(error)
        localStorage.setItem('auth-token', '')
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        localStorage.removeItem('userRole')
        localStorage.setItem('isAuth', false)
        localStorage.removeItem('x-auth-token')
        window.location = '/login'
    }
})

export function getItems(url, needHeaders) {
    return AxiosInstance.get(BASE_URL + url, needHeaders ? getHeaders() : {})
        .then(res => res)
        .catch(error => console.log(error))
}

export function putItems(url, data) {
    return AxiosInstance.put(BASE_URL + url, data, getHeaders())
        .then(res => res)
        .catch(error => console.log(error))
}

export function postItems(url, data, needHeaders) {
    return AxiosInstance.post(BASE_URL + url, data, needHeaders ? getHeaders() : {})
        .then(res => res)
        .catch(error => console.log(error))
}

export function deleteItems(url) {
    return AxiosInstance.delete(BASE_URL + url, getHeaders())
        .then(res => res)
        .catch(error => console.log(error))
}