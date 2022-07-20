document.getElementById('navLoginBtn').addEventListener('click', () => {
  if (navLoginBtn.textContent == 'Login') {
    document.getElementById('accordionUserLogin').classList.remove('d-none');
    document.getElementById('navUserInfo').classList.add('d-none');
    document.getElementById('loginId').value = '';
    document.getElementById('loginPass').value = '';
    loginNotif.innerHTML = '';
  } else {
    document.getElementById('accordionUserLogin').classList.add('d-none');
    document.getElementById('navUserInfo').classList.remove('d-none');
    document.getElementById('loginId').value = '';
    document.getElementById('loginPass').value = '';
    loginNotif.innerHTML = '';
  }
});
