import { redirect } from "../../router/router.js"
import appState from "../../state/appState.js"

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
                    <a class="menu-toggle position-relative" onclick="toggleSidebar()">
                        <i class="fas fa-bars menu-toggle-icon"></i>
                    </a>
                    <!-- Search Form -->
                    <div class="w-100 me-3 search-form position-relative">
                        <input type="search" class="form-control ps-5" placeholder="Search..." aria-label="Search"
                            style="height: 40px;">
                        <i class="fa-solid fa-magnifying-glass position-absolute"
                            style="left: 7px; top: 50%; transform: translateY(-50%); font-size: 1.2rem;"></i>
                    </div>

                    <!-- User Icons and Dropdown -->
                    <div class="d-flex align-items-center pt-4">
                        <a class="nav-link px-3" href="#" style="line-height: 40px;">
                            <i class="fa-solid fa-circle-half-stroke" style="font-size: 1.2rem;"></i>
                        </a>
                        <!-- Notification Icon -->
                        <a class="nav-link px-3" href="#" style="line-height: 40px;">
                            <i class="fa-regular fa-bell" style="font-size: 1.2rem;"></i>
                        </a>

                        <!-- Mail Icon -->
                        <a class="nav-link px-3" href="#" style="line-height: 40px;">
                            <i class="fa-regular fa-envelope" style="font-size: 1.2rem;"></i>
                        </a>

                        <!-- User Name -->
                        <span class="nav-link px-3" style="line-height: 40px;">Quan&nbsp;Ha</span>

                        <!-- User Dropdown -->
                        <div class="dropdown">
                            <a href="#" class="d-block link-light text-decoration-none pb-4 me-2" id="dropdownUser2"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="../assets/profile.jpg" alt="User" width="40" height="40" class="rounded-circle">
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
    }
}

customElements.define('header-element', Header)

export default Header