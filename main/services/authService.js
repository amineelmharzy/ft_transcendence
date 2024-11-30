import { request } from '../api/request.js'
import { HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED } from '../misc/constants.js'

import httpState from '../state/httpState.js';
import appState from '../state/appState.js';

import { getUser } from './userService.js';

async function login(credentials) {
    await request({ uri: 'login', body: credentials }, false, [HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED])
        .then(async () => {
            await appState.update(null, httpState.response.access_token, true)
        }).catch(error => {
            throw new Error(error)
        })
}

async function register(userDetails) {
    await request({ uri: 'register', body: userDetails }, false, [HTTP_400_BAD_REQUEST])
        .catch(error => {
            throw new Error(error)
        })
}

function logout() {
    request({ uri: 'logout', method: 'GET' }, true)
        .then(data => {
        }).catch(error => {

        })
    appState.reset()
}

async function refreshToken() {
    await request({ uri: 'refresh_token', method: 'GET' })
        .then(async () => {
            await appState.update(null, httpState.response.access_token)
            return true
        }).catch(error => {
            return false
        })
}

async function enableOTP() {
    await request({ uri: 'enable_otp', method: 'GET' }, true)
        .then(() => {
            return false
        })
        .catch(error => {
            return false
        })
}

async function disableOTP() {
    await request({ uri: "disable_otp", method: "GET" }, true)
        .then(() => {
            return true
        }).catch(error => {
            return false
        })
}

async function confirmOTP(otp) {
    await request({ uri: 'confirm_otp', body: { 'otp': otp } }, true)
        .then(() => {
            return true
        }).catch(error => {
            return false
        })
}

export { login, register, logout }
export { enableOTP, disableOTP, confirmOTP }
export { refreshToken }