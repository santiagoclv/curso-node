const socket = io();

const messages = document.getElementById('messages');
const sendLocation = document.getElementById('send-location');
const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('message-chat', input.value);
        input.value = '';
    }
});

sendLocation.addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported in your browser');
    }
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} , timestamp}) => {
        socket.emit('send-location', {latitude, longitude, timestamp});
    })
})

socket.on('message-server', function (msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header").style.fontSize = "25px";
  } else {
    document.getElementById("header").style.fontSize = "50px";
  }
}