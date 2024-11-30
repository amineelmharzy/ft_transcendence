function Profile() {
    const container = document.createElement("div")
    container.innerHTML = `
        <div class="main-content">
            <div class="profile">
                <!-- Profile Background Image -->
                <div>
                    <label class="background-container">
                        <img src="../assets/images/background.avif" alt="" class="profile-cover">
                        <input type="file" id="backgroundPicture" class="d-none" accept="image/*">
                    </label>
                </div>

                <!-- Profile Avatar and Status -->
                <div class="profile-wrapper">
                    <div class="profile-avatar">
                        <label class="profile-picture-wrapper">
                            <img src="../assets/images/profile.jpg" alt="" class="profile-img">
                            <input type="file" id="profilePicture" class="d-none" accept="image/*">
                            <div class="online-status position-absolute"></div>
                        </label>
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

    // const menuToggler = container.querySelector(".menu-toggle")
    // menuToggler.addEventListener('click', () => {
    //     const sidebar = container.querySelector('.sidebar');
    //     const mainContent = container.querySelector(".main-content")
    //     const separator = container.querySelector('.sidebar-separator');
    //     mainContent.addEventListener('click', (event) => {
    //         if (!event.target.classList.contains('menu-toggle-icon')) {
    //             sidebar.classList.remove('active')
    //             menuToggler.classList.remove('hidden')
    //             separator.style.left = '0'
    //         }
    //     })
    //     sidebar.classList.toggle('active');
    //     if (sidebar.classList.contains('active')) {
    //         menuToggler.classList.add('hidden');
    //         separator.style.left = '250px';

    //     } else {
    //         menuToggler.classList.remove('hidden');
    //         separator.style.left = '0';
    //     }

    // })


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

    const backgroundImage = container.querySelector('.profile-cover');
    const backgroundPictureInput = container.querySelector('#backgroundPicture');

    backgroundPictureInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                backgroundImage.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    });

    const profileImage = container.querySelector('.profile-img');
    const profilePictureInput = container.querySelector('#profilePicture');

    profilePictureInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                profileImage.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    });
    return container
}

export default Profile