import { redirect } from "../router/router.js";
import { disableOTP, enableOTP } from "../services/authService.js";
import httpState from "../state/httpState.js";

function Enable2FA() {
    const container = document.createElement("div")
    container.classList.add('container-form-content')
    container.innerHTML = `
        <div class="settings-box">
            <h2 class="text-center">Two-Factor Authentication</h2>
            <p class="text-center">Increase the security of your account by enabling two-factor authentication.
            </p>
            <div class="d-flex align-items-center justify-content-between">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="twoFactorSwitch">
                    <label class="form-check-label switch-label" for="twoFactorSwitch">Enable Two-Factor
                        Authentication</label>
                </div>
                <button class="btn btn-primary" id="saveButton">Save Changes</button>
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
    `

    let is2FAEnabled = false;
    let otp_path;

    container.querySelector("#twoFactorSwitch").addEventListener('change', () => {
        is2FAEnabled = !is2FAEnabled
        update2FAStatus()
        const qrcode = document.getElementById("qrcode")
        if (is2FAEnabled) {
            qrcode.style.display = 'block'
            generateQRCode()
        } else {
            qrcode.style.display = 'none'
        }
    })

    function update2FAStatus() {
        const status = document.getElementById("statusText")
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
        const qrcode = document.getElementById("qrcode-box")
        qrcode.innerHTML = ''
        new QRCode(qrcode, {
            text: otp_path,
            width: 200,
            height: 200,
        })
    }

    container.querySelector("#saveButton").addEventListener('click', async () => {
        if (!is2FAEnabled) {
            await disableOTP()
        }
        document.getElementById("successMessage").classList.remove('d-none')
        setTimeout(() => {
            document.getElementById("successMessage").classList.add('d-none')
            if (is2FAEnabled) {
                redirect('confirm2fa')
            } else {
                redirect('chat')
            }
        }, 2000)
    })
    return container
}

export default Enable2FA