import axios from 'axios'

import { BASE_URL } from '../config'

const getHeaders = () => {
    return {
        headers: {
            'x-auth-token': localStorage.getItem('x-auth-token') 
        }
    }
}

const expired = () => {
    localStorage.setItem('auth-token', '')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    localStorage.removeItem('userRole')
    localStorage.setItem('isAuth', false)
    localStorage.removeItem('x-auth-token')
    window.location = '/login'
}

export function getItems(url, setData, needHeaders) {
    return axios.get(BASE_URL + url, needHeaders ? getHeaders() : {})
        .then(res => setData === null ? console.log(res.data) : setData(res.data))
        .catch(error => {
            if (error.response.status === 401) {
                expired()
            }
            console.log(error)
        })
}

export function putItems(url, data, setData) {
    return axios.put(BASE_URL + url, data, getHeaders())
        .then(res => setData === null ? console.log(res.data) : setData(res.data))
        .catch(error => {
            if (error.response.status === 401) {
                expired()
            }
            console.log(error)
        })
}

export function postItems(url, data) {
    return axios.post(BASE_URL + url, data, getHeaders())
        .then(res => console.log(res.data))
        .catch(error => {
            if (error.response.status === 401) {
                expired()
            }
            console.log(error)
        })
}

export function deleteItems(url) {
    return axios.delete(BASE_URL + url, getHeaders())
        .then(res => console.log(res))
        .catch(error => {
            if (error.response.status === 401) {
                expired()
            }
            console.log(error)
        })
}