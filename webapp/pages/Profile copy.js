function Profile() {
    const container = document.createElement("div")
    container.innerHTML = `
        <div class="sidebar d-flex flex-column text-white">
            <a href="#" class="navbar-brand align-items-center text-decoration-none pt-3 ms-3">
                <span class="fs-4">Google</span>
            </a>
            <div class="mt-5 mb-auto">
                <ul class="nav flex-column mb-auto">
                    <li class="nav-item">
                        <a href="#" class="nav-link d-flex" aria-current="page">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-house-door" viewBox="0 0 16 16">
                                <path
                                    d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                            </svg>
                            <span class="ms-2">Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-book" viewBox="0 0 16 16">
                                <path
                                    d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                            </svg>
                            <span class="ms-2">
                                Latest&nbsp;News
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-controller" viewBox="0 0 16 16">
                                <path
                                    d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1z" />
                                <path
                                    d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729q.211.136.373.297c.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466s.34 1.78.364 2.606c.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527s-2.496.723-3.224 1.527c-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.3 2.3 0 0 1 .433-.335l-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a14 14 0 0 0-.748 2.295 12.4 12.4 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.4 12.4 0 0 0-.339-2.406 14 14 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27s-2.063.091-2.913.27" />
                            </svg>
                            <span class="ms-2">
                                Play
                            </span>
                        </a>
                    </li>
                    <li>
                    <a href="#" class="nav-link d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat"
                            viewBox="0 0 16 16">
                            <path
                                d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                        </svg>
                        <span class="ms-2">
                            Chat
                        </span>
                    </a>
                </li>
                    <li>
                        <a href="#" class="nav-link d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-geo-alt" viewBox="0 0 16 16">
                                <path
                                    d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            <span class="ms-2">
                                Explore
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-calendar4" viewBox="0 0 16 16">
                                <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                            </svg>
                            <span class="ms-2">
                                Events
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
            <hr class="ms-2">
            <div>
                <a href="https://github.com/madebyamine" class="d-flex align-items-center text-decoration-none ms-2"
                    style="color: #606a8d;">
                    <i class="fa-brands fa-github me-2"></i>
                    <strong>Follow me on Github</strong>
                </a>
            </div>
        </div>
        <div class="sidebar-separator"></div>
        <div class="main-content">
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
                                <li><a class="dropdown-item" href="#">Settings</a></li>
                                <li><a class="dropdown-item" href="#">Profile</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-separator"></div>
            <div class="profile">
                <!-- Profile Background Image -->
                <img src="../assets/background.avif" alt="" class="profile-cover">

                <!-- Profile Avatar and Status -->
                <div class="profile-wrapper">
                    <div class="profile-avatar">
                        <img src="../assets/profile.jpg" alt="" class="profile-img">
                        <div class="online-status position-absolute"></div>
                    </div>

                    <div class="d-flex align-items-center justify-content-between">
                        <!-- Profile Name -->
                        <div class="profile-name">Quan Ha</div>

                        <!-- Add Friend and Send Message Buttons -->
                        <div class="profile-actions text-center mt-2">
                            <button class="btn btn-primary me-2">Add Friend</button>
                            <button class="btn btn-dark">Send Message</button>
                        </div>
                    </div>

                    <!-- Profile Menu Links -->
                    <div class="profile-details">
                        <nav class="profile-menu nav nav-pills">
                            <a class="profile-menu-link active" data-bs-toggle="tab" href="#about" role="tab">About</a>
                            <a class="profile-menu-link" data-bs-toggle="tab" href="#friends" role="tab">Friends</a>
                            <a class="profile-menu-link" data-bs-toggle="tab" href="#stats" role="tab">Stats</a>
                            <a class="profile-menu-link" data-bs-toggle="tab" href="#games" role="tab">Games</a>
                        </nav>

                        <!-- Tab Content for Each Section -->
                        <div class="tab-content mt-4">
                            <!-- About Section -->
                            <div class="tab-pane fade show active" id="about" role="tabpanel">
                                <h4 class="section-title mb-4">Introduction</h4>
                                <div class="profile-section p-4">
                                    <div class="user-info">
                                        <!-- Full Name -->
                                        <div class="info-item mb-3">
                                            <div class="info-content">
                                                <h6 class="info-label mb-1">Full Name</h6>
                                                <p class="info-value mb-0">John Doe</p>
                                            </div>
                                        </div>
                                        <!-- Username -->
                                        <div class="info-item mb-3">
                                            <div class="info-content">
                                                <h6 class="info-label mb-1">Username</h6>
                                                <p class="info-value mb-0">@johndoe</p>
                                            </div>
                                        </div>
                                        <!-- Email -->
                                        <div class="info-item mb-3">
                                            <div class="info-content">
                                                <h6 class="info-label mb-1">Email</h6>
                                                <p class="info-value mb-0">johndoe@example.com</p>
                                            </div>
                                        </div>
                                        <!-- Biography -->
                                        <div class="info-item mb-3">
                                            <div class="info-content">
                                                <h6 class="info-label mb-1">Biography</h6>
                                                <p class="info-value mb-0">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                                                    viverra justo in mi varius, vitae volutpat quam feugiat.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Friends Section -->
                            <div class="tab-pane fade" id="friends" role="tabpanel">
                                <h4>Friends</h4>
                                <div class="profile-section">
                                    <ul class="list-group list-group-flush mt-4">
                                        <!-- Friend Item 1 (Online) -->
                                        <li class="list-group-item d-flex align-items-center border-0">
                                            <div class="d-flex align-items-center me-2">
                                                <img src="https://via.placeholder.com/40" alt="User"
                                                    class="rounded-circle me-2">
                                                <span>John Doe</span>
                                                <span class="status-dot circle-success rounded-circle ms-2"></span>
                                                <!-- Online Status -->
                                            </div>
                                        </li>

                                        <!-- Friend Item 2 (Offline) -->
                                        <li class="list-group-item d-flex align-items-center border-0">
                                            <div class="d-flex align-items-center me-2">
                                                <img src="https://via.placeholder.com/40" alt="User"
                                                    class="rounded-circle me-2">
                                                <span>Jane Smith</span>
                                                <span class="status-dot circle-secondary rounded-circle ms-2"></span>
                                                <!-- Offline Status -->
                                            </div>
                                        </li>

                                        <!-- Friend Item 3 (Online) -->
                                        <li class="list-group-item d-flex align-items-center border-0">
                                            <div class="d-flex align-items-center me-2">
                                                <img src="https://via.placeholder.com/40" alt="User"
                                                    class="rounded-circle me-2">
                                                <span>Michael Brown</span>
                                                <span class="status-dot circle-success rounded-circle ms-2"></span>
                                                <!-- Online Status -->
                                            </div>
                                        </li>

                                        <!-- Friend Item 4 (Offline) -->
                                        <li class="list-group-item d-flex align-items-center border-0">
                                            <div class="d-flex align-items-center me-2">
                                                <img src="https://via.placeholder.com/40" alt="User"
                                                    class="rounded-circle me-2">
                                                <span>Sarah Williams</span>
                                                <span class="status-dot circle-secondary rounded-circle ms-2"></span>
                                                <!-- Offline Status -->
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- More Section -->
                            <div class="tab-pane fade" id="stats" role="tabpanel">
                                <h4>Statistics</h4>
                                <div class="profile-section">
                                    <div class="chart-container text-center">
                                        <canvas id="stats-chart"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="games" role="tabpanel">
                                <h4>Matches</h4>
                                <div class="profile-section">
                                    <div class="empty-profile-section">No matches yet</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

    const menuToggler = container.querySelector(".menu-toggle")
    menuToggler.addEventListener('click', () => {
        const sidebar = container.querySelector('.sidebar');
        const mainContent = container.querySelector(".main-content")
        const separator = container.querySelector('.sidebar-separator');
        mainContent.addEventListener('click', (event) => {
            if (!event.target.classList.contains('menu-toggle-icon')) {
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


    const ctx = container.querySelector('#stats-chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['win', 'draw', 'lose'],
            datasets: [{
                label: 'stats',
                data: [300, 50, 100],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(255, 99, 132, 0.4)',
                    // 'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    // 'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    return container
}

export default Profile