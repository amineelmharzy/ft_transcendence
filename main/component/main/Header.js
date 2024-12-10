import { redirect } from "../../router/router.js"
import appState from "../../state/appState.js"
import layoutState from "../../state/layoutState.js"

class Header extends HTMLElement {
    constructor() {
        super()
        this.headerElement = document.createElement('div')
        this.appendChild(this.headerElement)
        this.create()
    }

    create() {
        this.headerElement.classList.add('header')
        this.headerElement.innerHTML = `
            <div class="container">
                <!-- Header Section with Fixed Height -->
                <div class="d-flex align-items-center justify-content-between" style="height: 60px;">
                    <a class="menu-toggle position-relative"">
                        <i class="fas fa-bars menu-toggle-icon"></i>
                    </a>
                    <!-- Search Form -->
                    <div class="w-100 me-3 search-form position-relative">
                        <input id="searchInput" type="search" class="form-control ps-5" placeholder="Search..." aria-label="Search"
                            style="height: 40px;">
                        <i class="fa-solid fa-magnifying-glass position-absolute"
                            style="left: 7px; top: 50%; transform: translateY(-50%); font-size: 1.2rem;"></i>
                    </div>

                    <!-- User Icons and Dropdown -->
                    <div class="d-flex align-items-center justify-content-end pt-4">
                        <a class="nav-link px-3" id="displayMode" href="#" style="line-height: 40px;">
                            <i class="fa-solid fa-circle-half-stroke" style="font-size: 1.2rem;"></i>
                        </a>
                        <!-- Notification Icon -->
                        <a class="nav-link px-3" href="#" style="line-height: 40px;">
                            <i class="fa-regular fa-bell" style="font-size: 1.2rem;"></i>
                        </a>

                        <!-- Mail Icon -->
                        <a class="nav-link px-3" href="/chat" style="line-height: 40px;">
                            <i class="fa-regular fa-envelope" style="font-size: 1.2rem;"></i>
                        </a>

                        <!-- User Name -->
                        <span class="nav-link px-3" style="line-height: 40px;">Quan&nbsp;Ha</span>

                        <!-- User Dropdown -->
                        <div class="dropdown">
                            <a href="#" class="d-block link-light text-decoration-none pb-4 me-2" id="dropdownUser2"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="../../assets/images/profile.jpg" alt="User" width="40" height="40" class="rounded-circle">
                            </a>
                            <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                                <li><a class="dropdown-item" href="/settings">Settings</a></li>
                                <li><a class="dropdown-item" href="/profile">Profile</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="/logout">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-separator"></div>
        `

        this.headerElement.querySelectorAll('.dropdown-item').forEach((link) => {
            link.onclick = (e) => {
                e.preventDefault()
                redirect(link.pathname)
            }
        })

        const displayModeBtn = this.headerElement.querySelector("#displayMode");
        displayModeBtn.addEventListener('click', (e) => {
            e.preventDefault()
            layoutState.darkMode = !layoutState.darkMode
            if (layoutState.darkMode) {
                document.documentElement.style.setProperty("--text-color", "#f5f5f5");
                document.documentElement.style.setProperty("--background-color", "#09090b");
                document.documentElement.style.setProperty("--divider-color", "rgba(255, 255, 255, 0.1)");
                document.documentElement.style.setProperty("--section-color", "rgba(30, 27, 75, 0.1)");
                document.documentElement.style.setProperty("--shadow-color", "rgba(255, 255, 255, 0.1)");
                document.documentElement.style.setProperty("--gray-color", "#ccc");
                document.documentElement.style.setProperty("--link-hover-color", "#fff");
            } else {
                document.documentElement.style.setProperty("--text-color", "#000");
                document.documentElement.style.setProperty("--background-color", "#fff");
                document.documentElement.style.setProperty("--divider-color", "rgba(0, 0, 0, 0.1)");
                document.documentElement.style.setProperty("--section-color", "rgba(30, 27, 75, 0.1)");
                document.documentElement.style.setProperty("--shadow-color", "rgba(0, 0, 0, 0.2)");
                document.documentElement.style.setProperty("--gray-color", "#777");
                document.documentElement.style.setProperty("--link-hover-color", "#000");
            }
        })

        const menuToggler = this.headerElement.querySelector(".menu-toggle")
        menuToggler.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            const separator = document.querySelector('.sidebar-separator');
            document.body.addEventListener('click', (event) => {
                if (event.x > 250) {
                    sidebar.classList.remove('active')
                    menuToggler.classList.remove('hidden')
                    separator.style.left = '0'
                }
            })
            sidebar.classList.toggle('active');
            if (sidebar.classList.contains('active')) {
                menuToggler.classList.add('hidden');
                separator.style.left = '250px';

            } else {
                menuToggler.classList.remove('hidden');
                separator.style.left = '0';
            }

        })
    }
}

customElements.define('header-element', Header)

export default Header