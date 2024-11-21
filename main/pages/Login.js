import { HTTP_400_BAD_REQUEST } from "../misc/constants.js"
import { parseFromFields, validateFromFields } from "../misc/formUtils.js"
import { login } from "../services/authService.js"
import { redirect } from "../router/router.js"

import httpState from "../state/httpState.js"

import Oauth from "./Oauth.js"
import appState from "../state/appState.js"


function handleLoginFailed(form) {
    if (httpState.status != "warning") {
        return
    }
    const formStatus = document.getElementById("form-status")
    formStatus.innerText = ""
    if (httpState.statusCode == HTTP_400_BAD_REQUEST) {
        validateFromFields(httpState.response)
    } else {
        formStatus.innerText = httpState.response["message"]
        formStatus.classList.add("text-danger")
        form.reset()
        document.activeElement.blur()
    }
}

function Login() {
    const container = document.createElement('div')
    const oauthContainer = Oauth()
    container.classList.add("container-form-content", "text-center")
    container.innerHTML = `
        <h1 class="h3 fw-normal">Please login</h1>
        <form class="form-login">
            <!-- <img class="mb-3" src="../assets/table-tennis-paddle-ball-solid.svg" alt="" width="72" height="57"> -->
            <p id="form-status"></p>
            <div class="form-floating">
                <input type="text" class="form-control" id="username" name="username" placeholder="Username">
                <label for="username">Username or Email</label>
                <div class="invalid-feedback text-start"></div>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                <label for="password">Password</label>
                <div class="invalid-feedback text-start"></div>
            </div>
            <input class="mt-2 w-100 btn btn-lg btn-primary" type="submit" id="submit" value="Login">
        </form>
        <div>
            <button class="mt-2 w-100 btn btn-lg btn-dark" id="register-btn">Register</button>
        </div>
        <div class="form-links mt-2 text-center">
            <a class="link-primary">Forgotten password?</a>
        </div>
        <hr>
    `

    container.appendChild(oauthContainer)

    container.querySelector("#register-btn").addEventListener('click', (e) => {
        e.preventDefault()
        redirect('register')
    })

    const form = container.querySelector(".form-login")
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const credentials = parseFromFields(form)
        login(credentials).then(() => {
            if (appState.user.otp_status) {
                redirect('confirm2fa')
            }
            redirect('/')
        }).catch(error => {
            handleLoginFailed(form)
        })
    })
    return container
}

export default Login