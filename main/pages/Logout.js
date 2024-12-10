import { toggleNavigationComponents } from "../misc/toggleUtils.js"
import { redirect } from "../router/router.js"
import { logout } from "../services/authService.js"

function Logout() {
    logout()
    toggleNavigationComponents()
    redirect('/login')
}

export default Logout