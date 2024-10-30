import { isAuthenticated } from "../misc/authUtils.js";
import { redirect } from "../router/router.js";

function authMiddleware(routeHandler) {
    return function () {
        if (!isAuthenticated()) {
            return redirect('login')
        }
        return routeHandler()
    }
}

function authRedirectMiddleware(routeHandler) {
    return function () {
        if (isAuthenticated()) {
            redirect('chat')
        }
        return routeHandler()
    }
}

export { authMiddleware, authRedirectMiddleware }