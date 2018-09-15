function ajax() {  
    var ajaxData = {    
        type: arguments[0].type || "GET",
            url: arguments[0].url || "",
            async: arguments[0].async || "true",
            data: arguments[0].data || null,
            dataType: arguments[0].dataType || "text",
            contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
            beforeSend: arguments[0].beforeSend || function () {},
            success: arguments[0].success || function () {},
            error: arguments[0].error || function () {}  
    }; 
    ajaxData.beforeSend(); 
    var xhr = createxmlHttpRequest();
    try{
        xhr.responseType = ajaxData.dataType;  
    }catch (err) {
        console.log(err)
    };
    xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);   
    xhr.setRequestHeader("Content-Type", ajaxData.contentType);   
    xhr.send(convertData(ajaxData.data));   
    xhr.onreadystatechange = function () {     
        if (xhr.readyState == 4) {       
            if (xhr.status == 200) {
                ajaxData.success(xhr.response);      
            } else {        
                ajaxData.error();      
            }     
        }  
    } 
};
function createxmlHttpRequest() {   
    if (window.ActiveXObject) {     
        return new ActiveXObject("Microsoft.XMLHTTP");   
    } else if (window.XMLHttpRequest) {     
        return new XMLHttpRequest();   
    } 
}; 
function convertData(data) {  
    if (typeof data === 'object') {    
        var convertResult = "";     
        for (var c in data) {       
            convertResult += c + "=" + data[c] + "&";     
        }     
        convertResult = convertResult.substring(0, convertResult.length - 1);   
        return convertResult;  
    } else {    
        return data;  
    }
};
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
var refreshed = false;
var myAuth = '?end=';
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
        // userAccount.textContent = name;

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
            if (pageUrl.indexOf('detail.html') > -1) {
                if (result.error) {
                    var testBody = document.getElementsByClassName('test-body')[0];
                    var testSure = document.getElementsByClassName('test-sure')[0];
                    testBody.textContent = '你还没有登入，请先登录';
                    testSure.textContent = '去登录';
                }
                getMember(result);
            }
        },
        error: function () {
            alert('系统异常，操作失败');
        }
    });
}
function getMember (result) {
    var isM = false;
    var endTime = '';
    if (result.endDate) {
        endTime = new Date(result.endDate.replace(/-/g, '/')).getTime();
        if (endTime > time) {
            isM = true;
        }
    }
    if(isM) {
        getAuth(myAuth);
    } else {
        getAuth('123456789');
    }
}
function getRefresh() {
    var rotation = document.getElementsByClassName('refresh')[0];
    rotation.querySelector('img').className = 'rotation';
    if (!refreshed) {
        refreshed = true;
        ajax({
            type: "post",
            url: '/refreshLogin',
            success: function (data) {
                location.reload();
            }
        });
    }
}
function continueTest() {
    testLook.style.display = 'none';
}
function beComeMember () {
    var user = sessionStorage.getItem('user');
    testLook.style.display = 'none';
    if (user) {
        window.location.href = '/mine.html';
    } else {
        showMOdel('login');
    }
}
function goMyCenter() {
    window.location.href = '/mine.html';
}