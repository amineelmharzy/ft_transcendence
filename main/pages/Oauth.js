import { authLoginIntra } from "../services/authService.js"

function Oauth() {
    const container = document.createElement('div')
    container.classList.add('container-oauth', 'mt-2', 'text-center')
    container.innerHTML = `
        <div class="container-oauth-google mb-2">
            <button class="oauth-btn w-100" id="google-oauth-btn">
                <img src="../assets/brands/google.png" alt="Google Logo">
                <span><a>Continue with Google</a></span>
            </button>
        </div>
        <div class="container-oauth-42">
            <button class="oauth-btn w-100" id="intra-oauth-btn">
                <img id="intra-logo" src="../assets/brands/42.png" alt="42 Logo">
                <span><a>Continue with intra&nbsp;&nbsp;&nbsp;&nbsp;</a></span>
            </button>
        </div>
    `

    container.querySelector("#google-oauth-btn").addEventListener('click', () => {
    })
    container.querySelector("#intra-oauth-btn").addEventListener('click', async () => {
        await authLoginIntra();
    })

    return container
}

export default Oauth