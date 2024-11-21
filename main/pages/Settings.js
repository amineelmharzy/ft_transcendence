import { redirect } from "../router/router.js";
import { disableOTP, enableOTP } from "../services/authService.js";
import appState from "../state/appState.js";
import httpState from "../state/httpState.js";

function Settings() {
    const container = document.createElement('div')
    container.innerHTML = `
        <div class="main-content">
            <div class="settings-container">
                <div class="settings-section mb-0">
                    <div class="d-flex justify-content-between align-items-center mb-0">
                        <h2 class="mb-0">Settings</h2>
                    </div>
                </div>

                <form class="settingsForm" id="settingsForm">
                    <!-- Personal Information -->
                    <div class="settings-section">
                        <h4 class="mb-3"><i class="bi bi-person me-1"></i>Personal Information</h4>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="firstName" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="firstName" placeholder="Enter first name" value="${appState.user.first_name}">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="lastName" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="lastName" placeholder="Enter last name" value="${appState.user.last_name}">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" placeholder="Enter username" value="${appState.user.username}">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email Address</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter email" value="${appState.user.email}">
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">Phone Number</label>
                            <input type="tel" class="form-control" id="phone" placeholder="Enter phone number" value="${appState.user.first_name}">
                        </div>
                        <div class="mb-3">
                            <label for="biography" class="form-label">Biography</label>
                            <textarea class="form-control" id="biography" placeholder="Biography" value="${appState.user.first_name}"></textarea>
                        </div>
                    </div>

                    <!-- Security Settings -->
                    <div class="settings-section">
                        <h4 class="mb-3"><i class="bi bi-shield-lock me-1"></i>Security Settings</h4>
                        <div class="mb-3">
                            <label for="currentPassword" class="form-label">Current Password</label>
                            <input type="password" class="form-control" id="currentPassword" placeholder="Enter current password">
                        </div>
                        <div class="mb-3">
                            <label for="newPassword" class="form-label">New Password</label>
                            <input type="password" class="form-control" id="newPassword" placeholder="Enter new password">
                        </div>
                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm New Password</label>
                            <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm new password">
                        </div>
                    </div>
                    <div class="settings-section">
                        <h4 class="mb-3"><i class="bi bi-fingerprint me-1"></i>Authorization Settings</h4>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="twoFactorSwitch">
                            <label class="form-check-label switch-label" for="twoFactorSwitch">Enable Two-Factor
                                Authentication</label>
                        </div>
                        <div class="mt-4">
                            <p><strong>Status:</strong> <span id="statusText" class="muted-text">2FA is currently
                                    off.</span></p>
                        </div>
                        <div id="qrcode">
                            <p>Scan this QR code with your authenticator app:</p>
                            <div id="qrcode-box"></div>
                        </div>
                        <div id="successMessage" class="alert alert-success d-none mt-3" role="alert">
                            Your 2FA settings have been updated successfully.
                        </div>
                    </div>
                    <!-- Save Changes Button -->
                    <div class="settings-section settings-section-change">
                        <button type="submit" class="btn btn-primary" id="saveButton">
                            <i class="bi bi-check2-circle me-2"></i>Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `

    container.querySelector("form").addEventListener('submit', (e) => {
        e.preventDefault()
    })
    const checkbox = container.querySelector("#twoFactorSwitch")
    let is2FAEnabled = appState.user.otp_status;
    let otp_path;

    checkbox.addEventListener('change', () => {
        is2FAEnabled = !is2FAEnabled
        update2FAStatus()
        const qrcode = container.querySelector("#qrcode")
        if (is2FAEnabled) {
            qrcode.style.display = 'block'
            generateQRCode()
        } else {
            qrcode.style.display = 'none'
        }
    })

    function update2FAStatus() {
        const status = container.querySelector("#statusText")
        if (is2FAEnabled) {
            status.innerText = "2FA is currently on."
            status.classList.remove('muted-text')
            status.classList.add('active-text')
        } else {
            status.innerText = "2FA is currently off."
            status.classList.remove('active-text')
            status.classList.add('muted-text')
        }
    }

    async function generateQRCode() {
        if (!otp_path) {
            try {
                await enableOTP()
                otp_path = httpState.response.otp_path
            } catch (e) {
                console.log(e.message)
            }
        }
        const qrcode = container.querySelector("#qrcode-box")
        qrcode.innerHTML = ''
        new QRCode(qrcode, {
            text: otp_path,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        })
    }

    container.querySelector("#saveButton").addEventListener('click', async () => {
        if (!is2FAEnabled) {
            await disableOTP()
        }
        container.querySelector("#successMessage").classList.remove('d-none')
        setTimeout(() => {
            container.querySelector("#successMessage").classList.add('d-none')
        }, 2000)
    })

    if (is2FAEnabled) {
        checkbox.checked = !checkbox.checked
        is2FAEnabled = !is2FAEnabled
        const changeEvent = new Event('change');
        checkbox.dispatchEvent(changeEvent);
    }

    return container
}

export default Settings