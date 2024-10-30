import appState from "./state/appState.js";
import { Router } from "../router/router.js";
import Header from "./component/main/Header.js";
import Sidebar from "./component/main/Sidebar.js";
import { toggleNavigationComponents } from "./misc/toggleUtils.js";
import layoutState from "./state/layoutState.js";

await appState.init()

if (appState.isAuthenticated) {
    layoutState.commonLayout = true
    // toggleNavigationComponents()
}


Router()
