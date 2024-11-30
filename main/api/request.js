import { resolveURI } from '../misc/apiUtils.js'
import { HTTP_401_UNAUTHORIZED } from '../misc/constants.js';
import { refreshToken } from '../services/authService.js';
import appState from '../state/appState.js';
import httpState from '../state/httpState.js';

async function request({ uri, method = "POST", headers = {}, body }, auth_required = false, exclude = []) {
    const defaults = { "Content-Type": "application/json" }

    if (auth_required) {
        defaults["Authorization"] = `Bearer ${appState.token}`
    }

    headers = { ...defaults, ...headers };
    let endpoint = resolveURI(uri)
    if (!endpoint) {
        endpoint = uri
    }

    const response = await fetch(endpoint, {
        method: method,
        headers: headers,
        credentials: 'include',
        body: JSON.stringify(body)
    })
    const jsonResponse = response.headers.get('Content-Type')?.includes('application/json');
    if (!response.ok) {
        if (exclude.includes(response.status)) {
            httpState.update("warning", response.status, jsonResponse ? await response.json() : null)
        } else {
            if (response.status == HTTP_401_UNAUTHORIZED) {
                if (await refreshToken()) {
                    return await request({ uri, method, headers, body }, auth_required, exclude)
                }
            }
            httpState.update("error", response.status, null)
        }
        throw new Error()
    }
    httpState.update("sucess", response.status, jsonResponse ? await response.json() : null)
}

export { request }