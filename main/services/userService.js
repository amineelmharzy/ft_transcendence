import { request } from "../api/request.js"
import appState from "../state/appState.js"
import httpState from "../state/httpState.js"

async function getUser() {
    await request({ uri: 'user', method: 'GET' }, true).catch(error => {
        return null
    })
    return httpState.response
}

export { getUser }