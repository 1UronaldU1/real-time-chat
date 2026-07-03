const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const notification = document.getElementById('notification');

form.addEventListener('submit', (e) => {

    e.preventDefault();

    if(input.value){

        socket.emit('chat message', input.value);

        input.value = '';
    }
});

socket.on('chat message', (msg) => {

    const item = document.createElement('li');

    item.textContent = msg;

    messages.appendChild(item);

    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('support-alert', (data) => {

    const item = document.createElement('li');
    item.className = 'system-message';
    item.innerHTML = '<strong>' + data.titulo + '</strong>: ' + data.mensaje;

    messages.appendChild(item);

    if (notification) {
        notification.textContent = data.titulo + ': ' + data.mensaje;
        notification.classList.remove('hidden');

        clearTimeout(notification.hideTimer);
        notification.hideTimer = setTimeout(() => {
            notification.classList.add('hidden');
            notification.textContent = '';
        }, 6000);
    }

    window.scrollTo(0, document.body.scrollHeight);
});