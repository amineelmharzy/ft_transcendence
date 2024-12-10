import { parseFromFields, validateFromFields } from "../misc/formUtils.js";
import { disableOTP, enableOTP } from "../services/authService.js";
import { updateUser } from "../services/userService.js";
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
                                <input type="text" class="form-control" id="firstName" name="first_name" placeholder="Enter first name" value="${appState.user.first_name}">
                                <div class="invalid-feedback text-start"></div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="lastName" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="lastName" name="last_name" placeholder="Enter last name" value="${appState.user.last_name}">
                                <div class="invalid-feedback text-start"></div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" name="username" placeholder="Enter username" value="${appState.user.username}">
                            <div class="invalid-feedback text-start"></div>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email Address</label>
                            <input type="email" class="form-control" id="email" name="email" placeholder="Enter email" value="${appState.user.email}">
                            <div class="invalid-feedback text-start"></div>
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">Phone Number</label>
                            <input type="tel" class="form-control" id="phone" placeholder="Enter phone number" value="">
                            <div class="invalid-feedback text-start"></div>
                        </div>
                        <div class="mb-3">
                            <label for="biography" class="form-label">Biography</label>
                            <textarea class="form-control" id="biography" name="bio" placeholder="Biography">${appState.user.bio}</textarea>
                            <div class="invalid-feedback text-start"></div>
                        </div>
                    </div>

                    <!-- Security Settings -->
                    <div class="settings-section">
                        <h4 class="mb-3"><i class="bi bi-shield-lock me-1"></i>Security Settings</h4>
                        <div class="mb-3">
                            <label for="currentPassword" class="form-label">Current Password</label>
                            <input type="password" class="form-control" name="password" id="currentPassword" placeholder="Enter current password">
                            <div class="invalid-feedback text-start"></div>
                        </div>
                        <div class="mb-3">
                            <label for="newPassword" class="form-label">New Password</label>
                            <input type="password" class="form-control" id="newPassword" placeholder="Enter new password">
                            <div class="invalid-feedback text-start"></div>
                        </div>
                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm New Password</label>
                            <input type="password" class="form-control" name="new_password"  id="confirmPassword" placeholder="Confirm new password">
                            <div class="invalid-feedback text-start"></div>
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
                        <button type="submit" class="ms-1 btn btn-outline-danger text-danger" id="deleteAccountBtn">
                            <i class="bi bi-x-circle me-2"></i>Delete Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `

    const form = container.querySelector("form")
    let updateError = false

    form.addEventListener('submit', (e) => {
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
        const data = parseFromFields(form)
        await updateUser(data).then(data, async () => {
            updateError = false
        }).catch(error => {
            validateFromFields(httpState.response)
            updateError = true
        })
        if (!is2FAEnabled && !updateError) {
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