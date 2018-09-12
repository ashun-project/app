var modal = document.getElementsByClassName('modal');
var mask = document.getElementsByClassName('mask')[0];
var loginMOdel = document.getElementsByClassName('login')[0];
var registerMOdel = document.getElementsByClassName('register')[0];
var loginBtn = document.querySelector('.login button');
var registerBtn = document.querySelector('.register button');
var loginForm = document.getElementById('login-form');
var registerForm = document.getElementById('register-form');
var logined = document.getElementById('logined');
var notLogin = document.getElementById('not-login');
var userAccount = document.getElementById('user-account');
var testLook = document.getElementById('test-look');
var time = new Date().getTime();
var member = null;
var pageUrl = window.location.href;

getVaidlogin();
mask.addEventListener('click', closeModal);
loginBtn.addEventListener('click', getLogin);
registerBtn.addEventListener('click', getRegister);
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
function getLogin() {
    var userName = loginForm.userName.value;
    var password = loginForm.password.value;
    var obj = {userName: userName, password: password };
    vaidParams(obj, '/login');
}
function getRegister() {
    var userName = registerForm.userName.value;
    var password = registerForm.password.value;
    var vaidPassword = registerForm.vaidPassword.value;
    if (vaidPassword !== password) {
        alert('两次密码输入不一致');
        return;
    }
    var obj = {userName: userName, password: password };
    vaidParams(obj, '/register');
}
function vaidParams(obj, url) {
    var error = '';
    for (var key in obj) {
        if (!obj[key]) {
            error = '用户或密码不能为空';
        }
        if (obj[key].length > 12) {
            error = '用户或密码不可超过12位';
        }
        if (obj[key].length < 3) {
            error = '用户或密码不可小于3位';
        }
    }
    if (error) {
        alert(error);
        return;
    }
    ajax({  
        type: "post",
        url: url,
        data: obj,
        success: function (data) {
            var result = JSON.parse(data);
            if (result.error) {
                alert(result.error);
            } else {
                // sessionStorage.setItem('user', data);
                // changeHead(result.userName);
                location.reload();
            }
        },
        error: function () {
            alert('系统异常，操作失败');
        }
    });
}
function outLogin () {
    ajax({  
        type: "post",
        url: '/logout',
        beforeSend: function () {},
        success: function (data) {
            var result = JSON.parse(data);
            if (result.error) {
                alert(result.error);
            } else {
                sessionStorage.setItem('user', '');
                // changeHead(); //todo 替换reload
                location.reload();
            }
        },
        error: function () {
            alert('系统异常，操作失败');
        }
    });
}
function changeHead (name) {
    if (name) {
        logined.style.display = 'block';
        notLogin.style.display = 'none';
        userAccount.textContent = name;

    } else {
        logined.style.display = 'none';
        notLogin.style.display = 'block'; 
    }
}
function getVaidlogin () {
    ajax({  
        type: "post",
        url: "/vdidLogin",
        success: function (data) {
            var result = JSON.parse(data);
            if (result.error) {
                var user = sessionStorage.getItem('user');
                if (user) {
                    alert('登入过期，请重新登入');
                    sessionStorage.setItem('user', '');
                }
            } else {
                if (!sessionStorage.getItem('user')) {
                    sessionStorage.setItem('user', data);
                }
                changeHead(result.userName);
            }
            getMember(result);
        },
        error: function () {
            alert('系统异常，操作失败');
        }
    });
}
function getMember (result) {
    var myValue = '';
    var num = 0;
    var timer = setInterval(function () {
        myValue = document.getElementsByTagName('video')[0];
        num += 30;
        if (myValue) {
            clearInterval(timer);
            if (pageUrl.indexOf('detail.html') > -1 && !getEndDate(result.endDate)) {
                testLook.style.display = 'block';
            } else {
                myValue.src = myValue.getAttribute('src').replace('?end=120', '');
            }
        }
        if (num > 6000) {
            clearInterval(timer);
        }
    }, 30);
    
}
function getEndDate (date) {
    var isM = false;
    var endTime = '';
    if (date) {
        endTime = new Date(date.replace(/-/g, '/')).getTime();
        if (endTime > time) {
            isM = true;
        }
    }
    return isM;
}
function continueTest() {
    testLook.style.display = 'none';
}
function beComeMember () {
    testLook.style.display = 'none';
    alert('完善中...');
}
function goMyCenter() {
    alert('完善中...');
}