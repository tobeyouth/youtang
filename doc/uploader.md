#上传组件 -- uploader.js


上传动作通过form提交到一个隐藏的iframe实现，所以可以``跨域``。

####默认参数：

	var defaultSetting = {
		// 基本功能
		'trigger' : null, // jquery selector,触发元素
		'action' : null, //string ,提交地址
		'name' : 'file', // string,上传文件的名字
		'data' : {}, // obj,要随文件发送的其他数据
		'limit' : 1, // num,可以上传几个文件
		'multiple' : false, // boolean,是否多文件上传
		'accept' : null , // string or obj 对文件的限制，string为已经设定的几种限制,obj为可定制的限定
		'beforeSubmit' : null, // fun,上传开始之前的回调，返回false的话，会阻止上传
		'startSubmit' : null, // fun,上传开始之后的回调
		'completeSubmit' : null, // fun,上传完成之后的回调，无论成功与否，都会回调
		'success' : null, // fun,上传成功的回调
		'error' : null, // fun,上传失败的回调
		'change' : null, // fun,改变file的回调
		'stop' : null, // fun,stop的回调
		'quickUp' : true, // boolean,是否快速上传（选择完就上传）
		'dataType' : 'json', // 上传成功回调函数的类型，默认为json
		'timeout' : null, // num,上传时间限制
		// 高级功能
		'useAjax' : false, // boolean，是否允许在同域且支持formData的情况下使用ajax方式上传（待测试）
		'useDrag' : false, // boolean,是否支持拖拽（待完成）
		'dragOn' : null, // 拖拽到trigger上方的回调（待完成）
		'dragEnd' : null // 拖拽完成的回调（待完成）
	};
	

####调用方法：

	var uploader = new Uploader({
		'action' : 'xxx' // 提交地址必填,其他可忽略
	});
	
####uploader对象本身提供的方法：

- submit : 上传，``参数可以是自定义的一个fun``
- stop	：停止上传，``参数可以是自定义的一个fun``
- destroy : 清除上传对象，``参数可以是自定义的一个fun``
- success : 触发上传成功的回调，``参数可以是自定义的一个fun``
- error : 触发上传失败的回调，``参数可以是自定义的一个fun``
- change : 触发文件路径改变的回调，``参数可以是自定义的一个fun``
- refreshFile : 重置上传控件的value