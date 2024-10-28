import { request } from "../api/request.js"
import httpState from "../state/httpState.js"

async function fetchChat() {
    await request({ uri: 'chat', method: 'GET' }, true)
        .catch(error => {
            return null
        })
    return httpState.response
}

async function getConversation(conversation) {
    await request({ uri: `http://localhost:8000/api/chat/${conversation}/`, method: 'GET' }, true)
        .catch(error => {
            return null
        })
    return httpState.response
}

async function deleteChat(conversation) {
    await request({ uri: `http://localhost:8000/api/chat/${conversation.target.username}/delete/`, method: 'DELETE' }, true)
}

export { fetchChat, getConversation, deleteChat }