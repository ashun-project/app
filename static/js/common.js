var modal = document.getElementsByClassName('modal');
var mask = document.getElementsByClassName('mask')[0];
var loginMOdel = document.getElementsByClassName('login')[0];
var registerMOdel = document.getElementsByClassName('register')[0];

mask.addEventListener('click', closeModal);
function showMOdel(type) {
    if(type === 'login') {
        loginMOdel.style.display = 'block';
        registerMOdel.style.display = 'none';
    } else {
        loginMOdel.style.display = 'none';
        registerMOdel.style.display = 'block';
    }
    mask.style.display = 'block';
}
function closeModal() {
    for (var i = 0; i < modal.length; i++) {
        modal[i].style.display = 'none';
    }
    mask.style.display = 'none';
}
function search (id) {
    var val = document.getElementById(id).value;
    if (val) {
        window.location.href = '/?myparams=?s='+val;
    } else {
        window.location.href = '/';
    }
}