import { HTTP_400_BAD_REQUEST } from "../misc/constants.js";
import { parseFromFields, validateFromFields } from "../misc/formUtils.js";
import { redirect } from "../router/router.js";
import { register } from "../services/authService.js";
import httpState from "../state/httpState.js";
import Oauth from "./Oauth.js";


function handleRegisterFailed(form) {
    if (httpState.status != "warning") {
        return
    }
    if (httpState.statusCode == HTTP_400_BAD_REQUEST) {
        validateFromFields(httpState.response)
    }
}

function handleRegisterFulfilled(form) {
    const formStatus = document.getElementById("form-status")
    formStatus.innerText = ""
    formStatus.innerText = httpState.response["message"]
    formStatus.classList.add("text-success")
    form.reset()
    document.activeElement.blur()
}

function Register() {
    const container = document.createElement('div')
    const oauthContainer = Oauth()
    container.classList.add("container-form-content", "text-center")
    container.innerHTML = `
        <h1 class="h3 mb-3 fw-normal">Please register</h1>
        <form action="#" class="form-register">
            <!-- <img class="mb-3" src="../assets/table-tennis-paddle-ball-solid.svg" alt="" width="72" height="57"> -->
            <p id="form-status"></p>
            <div class="form-floating">
                <input type="text" class="form-control" id="username" name="username" placeholder="Username">
                <label for="username">Username</label>
                <div class="invalid-feedback text-start"></div>
            </div>
            <div class="form-floating">
                <input type="email" class="form-control" id="email" name="email" placeholder="Email">
                <label for="email">Email address</label>
                <div class="invalid-feedback text-start"></div>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="password" name="password" minlength="8"
                    placeholder="Password">
                <label for="password">Password</label>
                <div class="invalid-feedback text-start"></div>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="password-confirm" name="password_confirm" minlength="8"
                    placeholder="Confirm password">
                <label for="password-confirm">Confirm password</label>
                <div class="invalid-feedback text-start"></div>
            </div>
            <input class="mt-2 w-100 btn btn-lg btn-primary" type="submit" value="Register">
        </form>
        <div>
            <button class="mt-2 w-100 btn btn-lg btn-dark" id="login-btn">Login</button>
        </div>
        <hr>
    `

    container.appendChild(oauthContainer)

    container.querySelector("#login-btn").addEventListener('click', (e) => {
        e.preventDefault();
        redirect('login')
    })

    const form = container.querySelector(".form-register")
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const userDetails = parseFromFields(form)
        register(userDetails).then(() => {
            handleRegisterFulfilled(form)
        }).catch(error => {
            handleRegisterFailed(form)
        })
    })
    return container
}

export default Register