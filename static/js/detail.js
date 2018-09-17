// 内容
// 判断是不是手机端
var ua = navigator.userAgent;
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
var isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
var isAndroid = ua.match(/(Android)\s+([\d.]+)/);
var isMobile = isIphone || isAndroid;
var params = window.location.search.split('myparams=');
var defaultUrl = '';
var bodyer = document.getElementById('bodyer');
var mySpare = document.getElementById('my-spare');
var iframe = '';
if (params && params.length > 1) defaultUrl = params[1];
function getAuth(status) {
    getHtml(defaultUrl, status);
}
function getHtml(url, status) {
    ajax({  
        type: "get",
          url: "/api/" + url,
          beforeSend: function () {},
            //some js code 
        success: function (msg) {
            var reTag = /autoplay="autoplay"|<link(?:.|\s)*?>|<script(?:.|\s)*?<\/script>|<iframe(?:.|\s)*?<\/iframe>/ig;
            document.documentElement.scrollTop=document.body.scrollTop=0;
            mySpare.innerHTML = msg.replace(reTag,'');
            setTimeout(function() {
                reset(status);
            }, 30);
        },
        error: function () {
            bodyer.innerHTML = '<a href="http://xjb520.com" style="color:red;display:block;text-align:center">获取资源失败，点我切换其它资源 </a>';
        }
    })
}
// 去除元素
function reset(status) {
    // 过滤元素下载链接
    var divEles = mySpare.children;
    var imgs = mySpare.querySelectorAll('img');
    var getA = mySpare.querySelectorAll('a');

    if (divEles && divEles.length) {
        // 去除a链接
        for (var i = 0; i < getA.length; i++) {
            var href = getA[i].getAttribute('href');
            if (href.indexOf('http:') > -1 && href.indexOf('https://51xiaoluoli.bid/') <= -1) {
                getA[i].parentNode.removeChild(getA[i]);
            } else {
                getA[i].setAttribute('my-data', href.replace('https://51xiaoluoli.bid/', ''));
                getA[i].removeAttribute('href');
            }
        }
        // 添加完整的图片路径
        for (var i = 0; i < imgs.length; i++) {
            var src = imgs[i].getAttribute('src');
            if (imgs[i].getAttribute('data-original')) {
                src = imgs[i].getAttribute('data-original');
                imgs[i].setAttribute('src', src);
            }
            if (src.indexOf('http') === -1) {
                imgs[i].setAttribute('src', '//51xiaoluoli.bid/' + src);
            }
        }
        var itemTitle = mySpare.querySelector('.item_title');
        var video = mySpare.querySelector('video');
        var src = video.getAttribute('src');
        video.setAttribute('src', src.split(status)[0]);
        // video_tagauto(video);

        // var iframe = document.createElement('iframe');
        var div = document.createElement('div');
        var html = '';
        iframe = document.createElement('iframe');
        div.appendChild(video);
        html = '<!doctype html><head><meta charset="utf-8"></head><body>'
                + '<style>*{box-sizing: border-box;margin:0;padding:0;}video{background:#000;width:100%;padding:30px;}@media(max-width:500px){video{padding: 2px;}}</style>'
                + div.innerHTML
                + '<script>var ev = document.querySelector("video");var width = parseInt(ev.getAttribute("width"));var height = parseInt(ev.getAttribute("height")) - 50;'
                + 'var widthcss = parseInt(ev.offsetWidth);var hig = (height / width) * widthcss;ev.style.height = hig+"px";window.parent.iframe.height=hig+10+"px";<\/script>'
                + '</body></html>';
        // +'<script>document.location.href="https://mp.xiaojiejie99.top/uploads/5dPrUy8B7mWJX3sSpivxCv29rULVBA/2018021410422163243953.mp4";<\/script><a target="_blank" href="https://www.baidu.com/">referrer test</a></body>',
        src = 'javascript:document.write(window.frameElement.getAttribute(\'data-src\'))';
        iframe.setAttribute('data-src', html);
        iframe.setAttribute('src', src);

        // var src = video.getAttribute('src').replace('https://mp.xiaojiejie99.top', '');
        // video.setAttribute('src', '/api2' + src.split(status)[0]);
        bodyer.innerHTML = '';
        bodyer.appendChild(itemTitle);
        bodyer.appendChild(iframe);
        mySpare.parentNode.removeChild(mySpare);


        if (status == '123456789') {
            testLook.style.display = 'block';
        }
        // video_tagauto(video);
        
    } else {
        reset(status);
    }
}
function video_tagauto(ev) {
    var width = parseInt(ev.getAttribute('width')),
        height = parseInt(ev.getAttribute('height')) - 50,
        widthcss = parseInt(ev.offsetWidth);
    ev.style.height = (height / width) * widthcss + 'px';
}