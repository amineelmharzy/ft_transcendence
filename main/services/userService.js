import { request } from "../api/request.js"
import { resolveURI } from "../misc/apiUtils.js"
import { HTTP_400_BAD_REQUEST } from "../misc/constants.js"
import appState from "../state/appState.js"
import httpState from "../state/httpState.js"

async function getUser() {
    await request({ uri: 'user', method: 'GET' }, true).catch(error => {
        return null
    })
    return httpState.response
}

async function fetchUser(user) {
    await request({ uri: `${resolveURI('user')}${user}/`, method: 'GET' }, true).catch(error => {
        return null
    })
    return httpState.response
}

async function updateUser(userData) {
    await request({ uri: 'http://localhost:8000/auth/user/update/', method: 'PATCH', body: userData }, true, [HTTP_400_BAD_REQUEST]).catch(error => {
        throw new Error()
    })
    await appState.update(null, appState.token, false)
    return httpState.response
}

export { getUser, fetchUser, updateUser }