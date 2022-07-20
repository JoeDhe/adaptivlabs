//JS include reff -> https://devdojo.com/tnylea/include-html-inside-of-html
window.addEventListener('DOMContentLoaded', () => {
  let includes = document.getElementsByTagName('include');
  for (var i = 0; i < includes.length; i++) {
    let include = includes[i];
    load_file(includes[i].attributes.src.value, function (text) {
      include.insertAdjacentHTML('afterend', text);
      include.remove();
    });
  }

  function load_file(filename, callback) {
    fetch(filename)
      .then((response) => response.text())
      .then((text) => callback(text));
  }
});

function goHome() {
  document.getElementById('homePage').style.display = 'block';
  document.getElementById('product').style.display = 'none';
  document.getElementById('product').classList.add('d-none');
}

function goService() {
  document.getElementById('homePage').style.display = 'none';
  document.getElementById('product').style.display = 'block';
  document.getElementById('product').classList.remove('d-none');
}
