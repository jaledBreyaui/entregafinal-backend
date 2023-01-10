const socket = io('http://localhost:8000').connect()

const mensajear = document.querySelector('#chatear')

const renderChat = (mensajes) => {
    if (mensajes.length >= 1) {
        let chat = document.querySelector('.listadoChat')
        let html = mensajes.map(msj => {
            return `<li>
                <p><strong>${msj.userEmail}</strong> : ${msj.message} </p>
            </li>`
        })

        chat.innerHTML = html.join(' ')
    }
}

mensajear.addEventListener('click', (e) => {
    e.preventDefault()
    const message = document.querySelector('#mensaje').value.trim()
    if (message.value == ' ') {
        console.log('hola');
    }
    if (message.length > 1) {
        const email = document.querySelector('#userEmail').value
        const userEmail = email
        const obj = {
            userEmail,
            message
        }
        socket.emit('new-message', obj)
        document.querySelector('#mensaje').value = " "
        return false
    }
})

socket.on('chat-server', (mensajes) => {
    renderChat(mensajes)
})