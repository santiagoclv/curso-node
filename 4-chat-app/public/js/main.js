const socket = io();

const messages = document.getElementById('messages');
const sendLocation = document.getElementById('send-location');
const button = document.getElementById('button');
const form = document.getElementById('form');
const input = document.getElementById('input');
const params = new URLSearchParams(location.search);

const nickname = params.get('nickname');
const room = params.get('room');


form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    button.disabled = true;
    socket.emit('message-chat', { value: input.value, timestamp: Date.now() }, (payload) => {
      setTimeout(() => button.disabled = false, 200)
    });
    input.value = '';
    input.focus();
  }
});

sendLocation.addEventListener('click', () => {

  if (!navigator.geolocation) {
    return alert('Geolocation is not supported in your browser');
  }
  sendLocation.disabled = true;
  navigator.geolocation.getCurrentPosition(({ coords, timestamp }) => {
    socket.emit('send-location', { value: { latitude: coords.latitude, longitude: coords.longitude}, timestamp }, (payload) => {
      setTimeout(() => sendLocation.disabled = false, 200)
    });
  });
});

socket.on('message-server', function (payload) {
  const isLink = typeof payload.value === "object";
  const item = document.createElement('li');
  const user = document.createElement('div');
  const message = document.createElement('div');

  item.style.display = "flex";
  item.style.flexDirection = "column";
  item.appendChild(user);
  item.appendChild(message);

  const username = document.createElement('span');
  const time = document.createElement('span');
  username.textContent = `${payload.user.nickname} `;
  username.style.margin = "5px";
  time.textContent = `${new Date(payload.timestamp)}`;
  time.style.color = "grey";

  user.appendChild(username);
  user.appendChild(time);

  if (isLink) {
    const link = document.createElement('a');
    link.textContent = `Location`;
    link.target = '_blank';
    link.href = `https://google.com/maps?q=${payload.value.latitude},${payload.value.longitude}`;
    message.appendChild(link);
   } else {
    message.textContent = payload.value;
  }
  
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('message-metadata-server', function (payload) {
  const item = document.createElement('li');

  item.textContent = payload.value;
  
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('user-list-server', function (payload) {
  const list = document.getElementById('users-list');

  payload.forEach( user => {
    const item = document.createElement('li');
    item.textContent = user.nickname;
    list.appendChild(item);
  });
});

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header").style.fontSize = "25px";
  } else {
    document.getElementById("header").style.fontSize = "50px";
  }
}

socket.emit('join', { nickname, room }, (payload) => {
  if(payload){
    alert(payload)
    window.location = "/"
  }
});