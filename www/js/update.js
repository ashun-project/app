var wgtVer=null;  
var wgtUrl=null;
function plusReady(){  
	// ......  
	// 获取本地应用资源版本号
	plus.runtime.getProperty(plus.runtime.appid,function(inf){  
		wgtVer=inf.version;
		plus.nativeUI.alert('当前应用版本'+wgtVer);
		console.log("当前应用版本："+ wgtVer);
		checkUpdate()
	});  
}
// 检测更新  
var checkUrl="http://103.60.222.43:8899/update/app";  
function checkUpdate(){  
	plus.nativeUI.showWaiting("检测更新...");  
	var xhr=new XMLHttpRequest();  
	xhr.onreadystatechange=function(){  
		switch(xhr.readyState){  
			case 4:  
				plus.nativeUI.closeWaiting();  
				if(xhr.status==200){  
					plus.nativeUI.alert('检测更新成功123');
					var res = JSON.parse(xhr.responseText);
					wgtUrl = res.apkURL;
					newVer = res.version;
					if(wgtVer&&newVer&&(wgtVer!=newVer)){
						downWgt();  // 下载升级包  
					} else{
						plus.nativeUI.alert("无新版本可更新！");  
					}  
				}else{  
					console.log("检测更新失败！");  
					plus.nativeUI.alert("检测更新失败！");  
				}  
				break;  
			default:  
				break;
		}  
	}  
	xhr.open('GET',checkUrl);  
	xhr.send();  
}

// 下载wgt文件
function downWgt(){
	plus.nativeUI.alert("下载wgt文件");  
	plus.nativeUI.showWaiting("下载wgt文件...");  
	plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){  
		if ( status == 200 ) {   
			console.log("下载wgt成功："+d.filename);  
			installWgt(d.filename); // 安装wgt包  
		} else {  
			console.log("下载wgt失败！");  
			plus.nativeUI.alert("下载wgt失败！");  
		}  
		plus.nativeUI.closeWaiting();  
	}).start();  
}

// 更新应用资源  
function installWgt(path){  
	plus.nativeUI.showWaiting("安装wgt文件...");  
	plus.runtime.install(path,{},function(){  
		plus.nativeUI.closeWaiting();  
		console.log("安装wgt文件成功！");  
		plus.nativeUI.alert("应用资源更新完成！",function(){
			plus.nativeUI.alert("安装成功=====");
			plus.runtime.restart();  
		});  
	},function(e){
		plus.nativeUI.closeWaiting();
		console.log("安装wgt文件失败["+e.code+"]："+e.message);
		plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
	});
}

if(window.plus){  
	plusReady();  
}else{  
	document.addEventListener('plusready',plusReady,false);  
}