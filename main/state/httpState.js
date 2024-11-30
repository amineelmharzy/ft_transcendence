class HttpState {
    constructor() {
        this.status = 'pending' // success, error, warning
        this.statusCode = null
        this.response = null
    }

    async update(status, statusCode, response) {
        this.status = status
        this.statusCode = statusCode
        this.response = response
    }

    reset(status, statusCode, response) {
        this.status = 'pending'
        this.statusCode = null
        this.response = null
    }
}

const httpState = new HttpState()

export default httpState