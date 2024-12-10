import { formatYearDate } from "../misc/dateUtils.js";
import { updateUser } from "../services/userService.js";
import appState from "../state/appState.js";

function Profile(userData = null) {
    const container = document.createElement("div")
    if (!userData) {
        userData = appState.user
    }
    container.innerHTML = `
        <div class="main-content">
            <div class="profile">
                <!-- Profile Background Image -->
                <div>
                    <label class="background-container">
                        <img src="${userData.background_url}" alt="" class="profile-cover">
                        ${userData.id === appState.user.id ? `<input type="file" id="backgroundPicture" class="d-none" accept="image/*">` : ''}
                    </label>
                </div>

                <!-- Profile Avatar and Status -->
                <div class="profile-wrapper">
                    <div class="profile-avatar">
                        <label class="profile-picture-wrapper">
                            <img src="${userData.photo_url}" alt="" class="profile-img">
                            ${userData.id === appState.user.id ? `<input type="file" id="profilePicture" class="d-none" accept="image/*">` : ''}
                            <div class="online-status position-absolute"></div>
                        </label>
                    </div>

                    <div class="d-flex align-items-center justify-content-between">
                        <!-- Profile Name -->
                        <div class="profile-name">${userData.first_name ? `${userData.first_name} ${userData.last_name}` : userData.username}</div>

                        <!-- Add Friend and Send Message Buttons -->
                        ${userData.id != appState.user.id ? `
                            <div class="profile-actions text-center mt-2">
                                <button class="btn btn-primary me-2">Add Friend</button>
                                <button class="btn btn-dark">Send Message</button>
                            </div>` : ''}
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
                                                <p class="info-value mb-0">${userData.first_name ? `${userData.first_name + ' ' + userData.last_name}` : userData.last_name ? userData.last_name : "No name provided."}</p>
                                            </div>
                                        </div>
                                        <!-- Username -->
                                        <div class="info-item mb-3">
                                            <div class="info-content">
                                                <h6 class="info-label mb-1">Username</h6>
                                                <p class="info-value mb-0">@${userData.username}</p>
                                            </div>
                                        </div>
                                        <!-- Email -->
                                        <div class="info-item mb-3">
                                            <div class="info-content">
                                                <h6 class="info-label mb-1">Email</h6>
                                                <p class="info-value mb-0">${userData.email}</p>
                                            </div>
                                        </div>
                                        <!-- Biography -->
                                        <div class="info-item mb-3">
                                            <div class="info-content">
                                                <h6 class="info-label mb-1">Biography</h6>
                                                <p class="info-value mb-0">
                                                    ${userData.bio ? userData.bio : "No bio set yet."}
                                                </p>
                                            </div>
                                        </div>
                                        <!-- Date Joined -->
                                        <div class="info-item mb-3">
                                            <div class="info-content">
                                                <h6 class="info-label mb-1">Date Joined</h6>
                                                <p class="info-value mb-0">
                                                    ${formatYearDate(userData.date_joined)}
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

    const backgroundContainer = container.querySelector('.background-container');
    const profilePictureContainer = container.querySelector('.profile-picture-wrapper');

    if (userData.id != appState.user.id) {
        backgroundContainer.classList.add('no-hover');
        profilePictureContainer.classList.add('no-hover')
    }

    if (userData.id === appState.user.id) {
        const backgroundImage = container.querySelector('.profile-cover');
        const backgroundPictureInput = container.querySelector('#backgroundPicture');
        backgroundPictureInput.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = async () => {
                    const base64Image = reader.result.split(',')[1]; // Base64 without prefix

                    try {
                        const response = await updateUser({ background_picture: base64Image });
                        backgroundImage.src = response.background_url
                    } catch (error) {
                    }
                };
                reader.readAsDataURL(file);
            }
        });

        const profilePicture = container.querySelector('.profile-img');
        const profilePictureInput = container.querySelector('#profilePicture');

        profilePictureInput.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = async () => {
                    const base64Image = reader.result.split(',')[1]; // Base64 without prefix

                    try {
                        const response = await updateUser({ profile_picture: base64Image });
                        profilePicture.src = response.photo_url
                    } catch (error) {
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
    return container
}

export default Profile