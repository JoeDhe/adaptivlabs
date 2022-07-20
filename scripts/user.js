//---------------LOG OUT PROCESS-----------------//
function logOutUser() {
  localStorage.removeItem('user');
  localStorage.removeItem('pass');
  document.location.reload();
}

//---------------AUTOLOGIN PROCESS-----------------//
window.addEventListener('DOMContentLoaded', () => {
  navLoginBtn.innerHTML = 'Loading..';

  let user = localStorage.getItem('user' || '');
  let pass = localStorage.getItem('pass' || '');

  if (
    localStorage.getItem('user') !== null &&
    localStorage.getItem('pass') !== null
  ) {
    if (typeof Storage !== 'undefined') {
      //----------Server Processing-------------//
      let Action = `login`;
      let Params = `user=${user}&pass=${pass}`;
      let Callback = `loginResponse`;
      URLparameter = `${URLbase}?action=${Action}&${Params}&callback=${Callback}`;
      sendToServer(URLparameter);
      // --------//Server Processing-------------//
    } else {
      console.log('Sorry, your browser does not support Web Storage...');
      navLoginBtn.innerHTML = 'Login';
    }
  } else {
    navLoginBtn.innerHTML = 'Login';
    console.log('Nothing in Web Storage...');
  }
});

//----------------LOGIN PROCESS-----------------//
function loginClick() {
  loginNotif.innerHTML = '';
  loginBtn.innerHTML = 'Please wait...';
  loginBtn.disabled = true;
  startTimer();

  if (loginId.value != '' && loginPass.value != '') {
    if (netStat === 1) {
      let username = document.getElementById('loginId').value;
      let password = document.getElementById('loginPass').value;

      //----------Server Processing-------------//
      let Action = `login`;
      let Params = `user=${username}&pass=${password}`;
      let Callback = `loginResponse`;
      URLparameter = `${URLbase}?action=${Action}&${Params}&callback=${Callback}`;
      sendToServer(URLparameter);
      // --------//Server Processing-------------//

    } else {
      loginNotif.innerHTML = 'No connection!';
      stopTimer();
      loginBtn.innerHTML = 'Submit';
      loginBtn.disabled = false;
    }
  } else {
    loginNotif.innerHTML = 'Username/password belum diisi!';
    stopTimer();
    loginBtn.innerHTML = 'Submit';
    loginBtn.disabled = false;
  }
}

function loginResponse(e) {
  if (e.status == 200) {
    document.getElementById('loginId').value = '';
    document.getElementById('loginPass').value = '';
    document.getElementById('accordionUserLogin').classList.add('d-none');
    document.getElementById('navUserInfo').classList.remove('d-none');
    
    stopTimer();
    onSuccessLoginHandle(e);
    console.log(e);
  } else {
    //failure login here
    loginNotif.innerHTML = 'Username/password anda salah!';
    loginBtn.innerHTML = 'Submit';
    loginBtn.disabled = false;
    stopTimer();
    console.log(e);
  }
}

function loginTimeout() {
  loginNotif.innerHTML = 'Login timout! Ulangi beberapa saat lagi!';
  stopTimer();
  loginBtn.innerHTML = 'Submit';
  loginBtn.disabled = false;
}

function onSuccessLoginHandle(e) {
  navLoginBtn.innerHTML = `${e.userinfo[2]}'s Profile`;
  usernameSpan.innerHTML = `Halo ${e.userinfo[2]},`;
  userinfoId.value = `${e.userinfo[0]}`;
  userinfoEmail.value = `${e.userinfo[3]}`;
  userinfoPhone.value = `${e.userinfo[4]}`;
  userinfoPass.value = `${e.userinfo[1]}`;
  loadTrxDataUser(e);

  
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('user', `${e.userinfo[0]}`);
    localStorage.setItem('pass', `${e.userinfo[1]}`);
  } else {
    console.log('LS not suported!');
  }
}
//-----------LOGIN PROCESS ENDS-----------------//

//https://script.google.com/macros/s/AKfycbxeU75vfR6ppVsHOXtKRFiIvQWBs2KRc7MIyOqbIDI/dev?action=getTrx&user=77707&callback=getTrxResponse

function syncTrxData(){
  document.getElementById("trxContent").remove();
  let username = localStorage.getItem('user');
        //----------Server Processing-------------//
        let Action = `getTrx`;
        let Params = `user=${username}`;
        let Callback = `loadTrxDataUser`;
        URLparameter = `${URLbase}?action=${Action}&${Params}&callback=${Callback}`;
        sendToServer(URLparameter);
        // --------//Server Processing-------------//
}

function loadTrxDataUser(e){
  
  let trxData = e.userTrx;
    if (trxData.length != 0){
//foreach bootstrap another method:
//--> https://www.codegrepper.com/code-examples/javascript/using+javascript+array+create+bootstrap+card

      trxData.forEach( trx => {
        let trxDiv = document.getElementById("trxDiv");
        let trxContent = document.createElement("div");
            trxContent.setAttribute("id", "trxContent")
            trxContent.classList.add("card", "mb-2");

        let cardBdTrx =document.createElement("div");
            cardBdTrx.classList.add("card-body");
            trxContent.appendChild(cardBdTrx);

        let notrx = document.createElement("h6")
        notrx.innerHTML = trx[0]+"-"+trx[2]+"-"+trx[1];
        cardBdTrx.appendChild(notrx);

        let trxdate = document.createElement("small")
        trxdate.innerHTML = trx[4]+"/"+trx[5]+"/"+trx[6];
        trxdate.classList.add("fw-bold", "text-muted");
        cardBdTrx.appendChild(trxdate);        

        let trxPay = document.createElement("h5")
        trxPay.innerHTML = trx[3];
        trxPay.classList.add("text-end", "text-muted");
        cardBdTrx.appendChild(trxPay);

        if(trx[7] == 0){
          let trxStat = document.createElement("span")
          trxStat.innerHTML = "Pending";
          trxStat.classList.add("badge", "text-bg-danger");
          cardBdTrx.appendChild(trxStat);
        }else{
          let trxStat = document.createElement("span")
          trxStat.innerHTML = "Success";
          trxStat.classList.add("badge", "text-bg-success");
          cardBdTrx.appendChild(trxStat);
        }


        trxDiv.appendChild(trxContent);
      });

    } else {
      document.getElementById("trxDiv").classList.add("h5", "text-center", "text-muted");
      document.getElementById("trxDiv").innerHTML = "No data transaction";
    }


}