const URLbase =
  'https://script.google.com/macros/s/AKfycbxeU75vfR6ppVsHOXtKRFiIvQWBs2KRc7MIyOqbIDI/dev';
let URLparameter = '';

//-----------SERVER JS---------------//
function sendToServer(URLparameter) {
  //bikin script di Head
  let newScript = document.createElement('script');
  newScript.setAttribute('src', URLparameter);
  newScript.setAttribute('id', 'jsonp');

  let Head = document.getElementsByTagName('head')[0];
  let jsonPscript = document.getElementById('jsonp');

  if (jsonPscript == null) {
    Head.appendChild(newScript);
    //jika blom ada script di Head, maka bikin
  } else {
    Head.replaceChild(newScript, jsonPscript);
    //jika sudah ada script, maka replace dg yg baru
  }
}

//cek internet
let netStat = '';
function connectionCheck() {
  if (navigator.onLine) {
    //internet online
    netStat = 1;
  } else {
    //internet offline
    netStat = 0;
  }
}

window.addEventListener('load', connectionCheck);
window.addEventListener('online', connectionCheck);
window.addEventListener('offline', connectionCheck);

let sendTimeout;
let sendInterval;

function startTimer() {
  sendInterval = setInterval(() => {
    console.log('sec.');
  }, 1000);

  sendTimeout = setTimeout(() => {
    clearInterval(sendInterval);
    timeOutStat = 1;
    document.getElementById('jsonp').remove();
    console.log('Time Out!');
    loginTimeout();
  }, 20000);
}

function stopTimer() {
  clearTimeout(sendTimeout);
  clearInterval(sendInterval);
}
//----------------SERVER JS ENDS---------------//
