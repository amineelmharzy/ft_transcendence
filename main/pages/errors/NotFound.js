import appState from "../../state/appState.js"
import { redirect } from "../../router/router.js"
import { toggleNavigationComponents } from "../../misc/toggleUtils.js"
import layoutState from "../../state/layoutState.js"

function NotFound() {
    const container = document.createElement('div')
    container.className = 'container-error pt-5'
    container.innerHTML = `
        <a href="/" id="logo-error">Home</a>
        <p><b>404.</b> <ins>That’s an error.</ins>
        <p>The requested URL was not found on this server. <ins>That’s all we know.</ins>
    `
    container.querySelector('a').onclick = (e) => {
        e.preventDefault()
        redirect(e.target.pathname)
    }
    toggleNavigationComponents()
    return container
}

export default NotFound