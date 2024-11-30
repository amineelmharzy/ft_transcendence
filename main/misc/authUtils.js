import appState from "../state/appState.js";

function isAuthenticated() {
    return appState.isAuthenticated
}

export { isAuthenticated }