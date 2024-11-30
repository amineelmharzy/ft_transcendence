import { getUser } from "../services/userService.js"

class AppState {
    constructor() {
        this.user = null
        this.token = localStorage.getItem("access_token")
        this.isAuthenticated = false
    }

    async init() {
        if (!this.user) {
            this.user = await getUser()
            if (this.user) {
                this.isAuthenticated = true
            }
        }
    }

    async update(user = null, token = null, isAuthenticated = false) {
        this.user = user
        this.token = token
        this.isAuthenticated = isAuthenticated

        if (!this.user) {
            this.user = this.user ?? await getUser()
            this.isAuthenticated = true
        }
        this.save()
    }

    save() {
        if (this.token) {
            localStorage.setItem("access_token", this.token)
        }
    }

    reset() {
        this.user = null
        this.token = null
        this.isAuthenticated = false

        this.destroy()
    }

    destroy() {
        localStorage.clear()
    }
}

const appState = new AppState()

export default appState