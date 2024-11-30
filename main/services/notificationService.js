import { request } from "../api/request.js";
import httpState from "../state/httpState.js";

function createNotificationSocket() {
    const Socket = new WebSocket(
        'ws://localhost:8000/ws/notification/'
    )

    Socket.onmessage = function (e) {
        const data = JSON.parse(e.data)
        console.log({
            "content": data.content,
            "link": data.link,
            "is_read": data.is_read,
            "timestamp": data.timestamp,
        })
    }

    Socket.onclose = function (e) {
        console.error('Chat socket closed unexpectedly');
    }
}

async function eraseNotifications() {
    await request({ uri: 'rm_notifications', method: 'DELETE' }, true)
        .catch(error => { return false })
    return true
}


async function fetchNotifications() {
    await request({ uri: 'notification', method: 'GET' }, true)
        .catch(error => { return null })
    return httpState.response
}



// async function eraseNotifications() {
//     const respose = await fetch('http://localhost:8000/api/notification/delete/',
//         {
//             method: 'DELETE',
//             headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
//             credentials: 'include'
//         })
//     if (!respose.ok) {
//         throw new Error('Failed to feach on notifications')
//     }
//     return true
// }

// async function fetchNotifications() {
//     const respose = await fetch('http://localhost:8000/api/notification/',
//         {
//             method: 'GET',
//             headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
//             credentials: 'include'
//         })
//     if (!respose.ok) {
//         throw new Error('Failed to feach on notifications')
//     }
//     return respose.json()
// }


export { fetchNotifications, eraseNotifications }