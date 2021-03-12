var socket = io()

const loaded = () => {
    const inputEl = document.querySelector('#search input')
    inputEl.oninput = (e) => socket.emit('search', e.target.value)
}

socket.on('found', (data) => console.log('found: ' + data))

document.addEventListener('DOMContentLoaded', loaded, false)