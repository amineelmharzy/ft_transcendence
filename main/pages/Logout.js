import { redirect } from "../router/router.js"
import { logout } from "../services/authService.js"

function Logout() {
    logout()
    redirect('/login')
}

export default Logout