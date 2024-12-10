import Header from "../component/main/Header.js"
import Sidebar from "../component/main/Sidebar.js"
import appState from "../state/appState.js"
import layoutState from "../state/layoutState.js"

function toggleNavigationComponents() {
    const header = document.querySelector(".header")
    const sidebar = document.querySelector(".sidebar")

    if (!appState.isAuthenticated)
        return 
    if (header) {
        header.remove()
        sidebar.remove()
        layoutState.commonLayout = false
    } else {
        document.querySelector("header").appendChild(new Header())
        document.querySelector(".wrapper").appendChild(new Sidebar())
        layoutState.commonLayout = true
    }
}

export { toggleNavigationComponents }