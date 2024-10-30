import { API_ENDPOINTS } from '../api/api.js'

function resolveURI(uri) {
    if (!uri)
        return null
    return API_ENDPOINTS[uri];
}

export { resolveURI }