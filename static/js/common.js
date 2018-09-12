var modal = document.getElementsByClassName('modal');
var mask = document.getElementsByClassName('mask')[0];
var loginMOdel = document.getElementsByClassName('login')[0];
var registerMOdel = document.getElementsByClassName('register')[0];
var loginBtn = document.querySelector('.login button');
var registerBtn = document.querySelector('.register button');
var loginForm = document.getElementById('login-form');
var registerForm = document.getElementById('register-form');
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
          beforeSend: function () {},
            //some js code 
        data: obj,
        success: function (data) {
            var result = JSON.parse(data);
            if (result.error) {
                alert(result.error);
            } else {
                // alert('操作成功');
                console.log(typeof result, '操作成功');
                sessionStorage.setItem('user', data);
            }
        },
        error: function () {
            alert('系统异常，操作失败');
        }
    });
}
function getVaidlogin () {
    ajax({  
        type: "post",
          url: "/vdidLogin",
          beforeSend: function () {},
            //some js code 
        success: function (data) {
            console.log(typeof data, data, 'vaid')
            var result = JSON.parse(data);
            if (result.error) {
                var user = sessionStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    if (user.userName) {
                        alert('登入失效，请重新登入');
                        sessionStorage.setItem('user', '');
                    }
                }
            } else {

            }
        },
        error: function () {
            alert('系统异常，操作失败');
        }
    });
}