function parseFromFields(form) {
    const formData = new FormData(form)
    let data = {}

    for (const [key, value] of formData) {
        data[key] = value
    }
    return data
}

function validateFromFields(fields) {
    for (const field in fields) {
        fields[field].forEach(message => {
            const input = document.getElementsByName(field)[0]
            if (input) {
                const feedback = input.parentNode.querySelector(".invalid-feedback")
                feedback.innerText = message
                input.classList.add('is-invalid')
                input.nextElementSibling.style.display = 'block'
                input.onfocus = function () {
                    input.value = ""
                    input.classList.remove("is-invalid")
                    input.nextElementSibling.style.display = 'inherit'
                }
                input.onchange = function () {
                    input.classList.remove("is-invalid")
                    input.nextElementSibling.style.display = 'inherit'
                }
            }
        });
    }
}

export { parseFromFields, validateFromFields }