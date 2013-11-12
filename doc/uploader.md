#上传组件

###uploader

上传动作通过form提交到一个隐藏的iframe实现，所以可以``跨域``。

#####默认参数：

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
	

#####调用方法：

	var uploader = new Uploader({
		'action' : 'xxx' // 提交地址必填,其他可忽略
	});
	
#####uploader对象本身提供的方法：

- submit : 上传，``参数可以是自定义的一个fun``
- stop	：停止上传，``参数可以是自定义的一个fun``
- destroy : 清除上传对象，``参数可以是自定义的一个fun``
- success : 触发上传成功的回调，``参数可以是自定义的一个fun``
- error : 触发上传失败的回调，``参数可以是自定义的一个fun``
- change : 触发文件路径改变的回调，``参数可以是自定义的一个fun``
- refreshFile : 重置上传控件的value

#####ps:
1. uploader支持多文件上传
2. 每次上传的过程会有一个单独的id,在``beforeSubmit``，``sucess``中传给回调函数，在``error``中会返回对应的上传的文件的``value``。
3. ``uploader.uploading``是正在上传的元素的集合，可以通过这个对象来获取所有正在上传阶段中的对象信息。



###MediaUploader

``uploadMedia-v2``,一个弹出层式的上传文件组件

#####默认参数
	var defaulSetting = {
		// 弹层模版部分
		'tpl' : defaultTpl,
		'layerClass' : '',
		'btn' : '上传',
		'id' : '',
		'title' : '上传',
		'typeIntro' : '', // 对于限定类型的提示或者其他的，写神马都可以
		// 弹层的回调部分
		'display' : null,
		'close' : null,
		'confirm' : null, // 点击确认之后的回调
		'complete' : null, // 上传之后的回调
		'success' : null, // 上传成功之后的回调
		'error' : null, // 上传失败的回调
		// uploader的回调部分
		'beforeSubmit' : null, // fun,上传开始之前的回调，返回false的话，会阻止上传
		'startSubmit' : null, 
		'completeSubmit' : null, // fun,上传完成之后的回调，无论成功与否，都会回调
		'uploadSuccess' : null, // fun,上传成功的回调
		'uploadError' : null, // fun,上传失败的回调
		'uploadChange' : null, // fun,改变file的回调
		// 业务部分
		'trigger' : null, // 触发选择器，可以不设置，不设置的话，可以调用open方法打开
		'name' : 'file', // 上传文件的名字
		'data' : {}, // 跟文件一起上传的数据
		'accept' : 'photo', // 上传文件的类型，在uploader.js中有三种预设类型,pdf,avatar和image
		'uploadUrl' : '', // 上传文件的地址
		'confirmUrl' : '', // 确认上传的地址
		'fastUp' : false, // 是否快速上传（就是up完就关闭弹层，不用走confirm的步骤）
		'limit' : 1 // 最多允许上传多少文件
	};

#####对外提供的方法
- render : 渲染弹出层
- open : 打开弹出层（在初始化时，如果传入了``trigger``参数，则会在点击``trigger``的时候触发``open``方法）
- close : 关闭弹出层
- deletefile : 删除一个已经上传的文件，``参数是该文件的文件名``
- submit : 上传文件列表
