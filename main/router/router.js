import Game from '../pages/Game.js';
import Chat from '../pages/Chat.js';
import Confirm2FA from '../pages/Confirm2FA.js';
import Enable2FA from '../pages/Enable2FA.js';
import Login from '../pages/Login.js'
import Profile from '../pages/Profile.js';
import Register from '../pages/Register.js';
import NotFound from "../pages/errors/NotFound.js";
import Logout from '../pages/Logout.js';

import { authMiddleware, authRedirectMiddleware } from '../middleware/auth.js';
import appState from '../state/appState.js';
import layoutState from '../state/layoutState.js';
import { toggleNavigationComponents } from '../misc/toggleUtils.js';
import Settings from '../pages/Settings.js';
import { fetchUser } from '../services/userService.js';

const pushState = window.history.pushState
const pushStateEvent = new Event('pushstate')

const routes = [
    { route: '/', handler: authMiddleware(Chat) },
    { route: '/play', handler: authMiddleware(Game) },
    { route: '/chat', handler: authMiddleware(Chat) },
    { route: '/login', handler: authRedirectMiddleware(Login) },
    { route: '/logout', handler: Logout },
    { route: '/profile', handler: authMiddleware(Profile) },
    { route: '/register', handler: authRedirectMiddleware(Register) },
    { route: '/settings', handler: authMiddleware(Settings) },
    { route: '/enable2fa', handler: Enable2FA },
    { route: '/confirm2fa', handler: Confirm2FA },
];


function render(view) {
    if (!view) { return }
    const container = document.querySelector(".main-container")
    if (!container) { return }
    if (container.firstChild) {
        container.removeChild(container.firstChild)
    }
    container.appendChild(view)
}

export function redirect(route) {
    if (route[0] != '/') {
        route = '/'.concat(route)
    }
    if (window.location.pathname != route) {
        window.history.pushState(null, '', route)
        Router()
    }
}

export function Router() {
    const path = window.location.pathname;
    const route = routes.find(r => r.route == path)
    if (route && route.handler) {
        if (!layoutState.commonLayout && appState.isAuthenticated) {
            toggleNavigationComponents()
        }
        return render(route.handler())
    }
    if (appState.isAuthenticated) {
        fetchUser(path.substring(1)).then(data => {
            if (data) {
                toggleNavigationComponents()
                return render(Profile(data))
            }
        })
    }
    return render(NotFound())
}

window.addEventListener('popstate', Router);
window.addEventListener('pushstate', Router);

