/**
 * 上传插件
 * 支持单文件上传和多文件上传
 *
 * 生成一个Uploader对象
 * 包含有stop,submit,destroy,success,error方法
 *
 * 2013 10.01
 * by jn
 */
(function (exports,$) {
	// 默认可选项
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
		'useAjax' : false, // boolean，是否允许在同域且支持formData的情况下使用ajax方式上传
		'useDrag' : false, // boolean,是否支持拖拽
		'dragOn' : null, // 拖拽到trigger上方的回调
		'dragEnd' : null // 拖拽完成的回调
	};

	// 默认设置的限制条件
	var defaultAccept = {
		// 大纲
		'outline' : {
			'type' : /application\/pdf|doc|docx|ppt|pptx/gi,
			'filetype' : /^.*pdf|.*doc|.*docx|.*ppt|.*pptx$/gi, 
			'size' : 1024 * 1024 * 20
		},
		// 头像
		'avator' : {
			'type' : /image\/*/gi,
			'filetype' : /[.*\.jpg]|[.*\.jpeg]|[.*\.png]/gi,
			'size' : 1024 * 1024 * 5
		},
		// 图片
		'photo' : {
			'type' : /image\/*/gi,
			'filetype' : /[.*\.jpg]|[.*\.jpeg]|[.*\.png]/gi,
			'size' : 1024 * 1024 * 5
		}
	};

	// 全局变量
	var uploaderCount = 0, // 记录iframe数目的一个值，用于区分不同的上传iframe
		uploaders = []; // 存储页面创建的所有uploader的数组

	// uploader对象
	function Uploader(setting) {
		uploaderCount += 1;
		this.setting = $.extend({},defaultSetting,setting);
		this.id = 'uploader_' + uploaderCount;
		this.loaded = 0; // 总共上传了几个文件
		this.uploadings = {}; // 上传行为的列表（支持多次上传）
		var uploader = this.init();
		uploaders.push(uploader);
		return uploader;
	};

	Uploader.prototype = {
		'constructor' : Uploader,
		// 初始化
		// 创建iframe和form
		// 绑定事件
		'init' : function () {
			var uploader = this,
				// iframeName = 'iframe-uploader-' + uploaderCount,
				// iframe = '<iframe name='+iframeName+'></iframe>',
				form = '<form method="post" enctype="multipart/form-data" target="" action='+uploader.setting.action+' name=uploader-form-'+uploaderCount+'></form>',
				input = document.createElement('input');
				// callInput = document.createElement('input');

			// 文件上传的input
			input.type = 'file';
			input.name = uploader.setting.name;
			if (uploader.setting.multiple) {
				input.multiple = true;
			};

			// 传送回调函数名的input
			// uploader.iframe = $(iframe).hide();
			uploader.form = $(form);
			uploader.input = $(input);
			uploader.trigger = typeof(uploader.setting.trigger) === 'string' ? $(uploader.setting.trigger) : uploader.setting.trigger;

			// 填入data
			for (var key in uploader.setting.data) {
				var hidden = document.createElement('input');
				$(hidden).attr({
					'type' : 'hidden',
					'name' : key,
					'value' : uploader.setting.data[key]
				});
				uploader.form.append(hidden);
			};

			// 设置样式
			uploader.input.attr('hidefocus', true).css({
			  position: 'absolute',
			  top: 0,
			  right: 0,
			  opacity: 0,
			  outline: 0,
			  cursor: 'pointer',
			  height: this.trigger.outerHeight(),
			  fontSize: Math.max(64, uploader.trigger.outerHeight() * 5)
			});

			// 塞入需要的input
			uploader.form.append(uploader.input);
			uploader.setPosition();

			// 绑定交互
			uploader.input.on('change',function (e) {
				if (!uploader.input.val()) {
					return;
				} else if (!!uploader.setting.data) {
					uploader.setting.data.fileName = uploader.input.val();
					var hiddenFileName = document.createElement('input');
					$(hiddenFileName).attr({
						'type' : 'hidden',
						'name' : 'fileName',
						'id' : 'hidden-filename',
						'value' : uploader.setting.data.fileName
					});
					uploader.form.find('#hidden-filename').remove();
					uploader.form.append(hiddenFileName);
				};
				if ($.isFunction(uploader.setting.change)) {
					uploader.setting.change.call(uploader,e);
				} else if (uploader.setting.quickUp) {
					uploader.submit();
				};
			});

			return uploader;
		},
		// 设置位置
		'setPosition' : function () {
			var uploader = this;
			uploader.form.css({
			  position: 'absolute',
			  top: uploader.trigger.offset().top,
			  left: uploader.trigger.offset().left,
			  overflow: 'hidden',
			  width: uploader.trigger.outerWidth(),
			  height: uploader.trigger.outerHeight(),
			  zIndex: findzIndex(uploader.trigger) + 10
			}).appendTo('body');
			return uploader;
		},
		// 上传动作
		'submit' : function () {
			var uploader = this,
				input = uploader.input[0],
				value = uploader.input.val(),
				files = input.files, // files对象
				accept = typeof(uploader.setting.accept) === 'string' ? defaultAccept[uploader.setting.accept] : uploader.setting.accept,
				typeReg = accept.type || /./gi,
				filetypeReg = accept.filetype || /./gi,
				sizeNum = parseInt(accept.size,10) || 1024 * 10 * 10;

			// 验证是否已经到达上限
			if (uploader.loaded >= uploader.setting.limit) {
				if ($.isFunction(uploader.setting.error)) {
					uploader.setting.error.call(uploader,{'err':'已经到达上传个数的上限','limit':uploader.setting.limit});
				};
				return;
			};

			// 绑定个files
			uploader.files = files;

			// 验证
			if (files && accept) {
				for (var i = 0,len = files.length;i < len;i++) {
					var type = files[i].type.toString(),
						filetype = files[i].name.split('.').pop(), // 文件后缀
						size = files[i].size,
						typePass = type.match(typeReg),
						filetypePass = filetype.match(filetypeReg),
						sizePass = size > sizeNum;

					if (!typePass || !filetypePass) {
						if ($.isFunction(uploader.setting.error)) {
							uploader.setting.error.call(uploader,{'err':'文件类型不正确！','file':files[i]});
						} else {
							alert('文件格式不正确');
						};
						return uploader;
					};

					if (size > sizeNum) {
						if ($.isFunction(uploader.setting.error)) {
							uploader.setting.error.call(uploader,{'err':'文件过大','file':files[i]});
						} else {
							alert('文件过大');
						};
						return uploader;
					}
				}
			} else if (accept) { // 不支持file对象的只能验证文件后缀
				var _filetype = uploader.input.val().split('.').pop();// 文件后缀
				if (!filetypeReg.test(_filetype)) {
					if ($.isFunction(uploader.setting.error)) {
						uploader.setting.error.call(uploader,{'err':'文件类型不正确','file':value});
					};
					return uploader;
				};
			};

			var submitId = createId('uploader-'); // 本次上传行为的ID
			uploader.uploadings[submitId] = {
				'submitId' : submitId,
				'val' : uploader.input.val()
			};
			
			// 触发回调
			if ($.isFunction(uploader.setting.beforeSubmit)) {
				uploader.setting.beforeSubmit.call(uploader,submitId);
			};

			var hostname = window.location.hostname,
				crossReg = new RegExp('http://[' + hostname + ']'),
				isCrossDomain = !crossReg.test(uploader.setting.action);

			// 验证通过进行提交
			if (window.FormData && uploader.files && uploader.setting.useAjax && !isCrossDomain) {
				var formData = new FormData(uploader.form[0]);
				formData.append(uploader.setting.name, uploader.files);
				$.ajax({
					'url' : uploader.setting.action,
					'type' : 'post',
					'data' : formData,
					'dataType' : uploader.setting.dataType,
					'processData': false,
					'contentType': false,
					'progress' : function () {
					},
					'success' : function (res) {
						if ($.isFunction(uploader.setting.success)) {
							uploader.setting.success.call(uploader,res);
						};
						uploader.loaded += 1;
						uploader.form.remove();
					},
					'error' : uploader.setting.error
				});
			} else {
				var iframe = '<iframe name='+submitId+'></iframe>';
					
				uploader.uploadingIframe = $(iframe).hide();
				uploader.form.attr({'target':submitId});

				// 添加被提交的iframe
				$('body').append(uploader.uploadingIframe);
				uploader.uploadingIframe.on('load',function (e) {
					var uploadingIframe = $(this),
						res = uploadingIframe.contents().find('body').html();
					// 干掉pre
					var response = res.replace(/<pre>|<pre(.[^>]*)>|<\/pre>/gi,'');

					if (!!response && uploader.setting.dataType === 'json') {
						response = $.parseJSON(response);
					};

					if (!response) {
					  if (uploader.setting.error) {
						uploader.setting.error.call(uploader,uploader.uploadings[submitId].val);
					  }
					} else {
					  if (uploader.setting.success) {
						uploader.setting.success.call(uploader,response,submitId);
					  }
					};

					uploader.loaded += 1;
					uploadingIframe.off('load').remove();
					// 在缓存对象中清除该iframe
					uploader.uploadings[submitId] = null;

					// 清除定时器
					if (uploader.timer) {
						clearTimeout(uploader.timer);
						uploader.timer = null;
					};
				});
				uploader.form.submit();

				// 在管理对象中添加上该iframe

				uploader.uploadings[submitId].iframe = $(uploader.uploadingIframe);
			};

			// 触发回调
			if ($.isFunction(uploader.setting.startSubmit)) {
				uploader.setting.startSubmit.call(uploader,submitId);
			};

			// 计时
			if (uploader.setting.timeout) {
				uploader.timer = setTimeout(function () {
					uploader.setting.error.call(uploader,{'err':'timeout'});
					uploader.stop();
				},uploader.setting.timeout);
			};

			return uploader;
		},
		// 停止上传
		'stop' : function (submitId) {
			var uploader = this;

			// 如果传入上传id，则只停在该iframe的上传
			// 否则停止所有的iframe上传
			if (submitId && uploader.uploadings[submitId]) {
				uploader.uploadings[submitId].iframe.off().remove();
				uploader.uploadings[submitId] = null;
			} else if (!submitId) {
				for (var key in uploader.uploadings) {
					uploader.uploadings[key].iframe.off().remove();
					uploader.uploadings[key] = null;
				}
			};

			uploader.refreshFile();
			if ($.isFunction(uploader.setting.stop)) {
				uploader.setting.stop.call(uploader);
			};
		},
		// 清空对象
		'destroy' : function () {
			var uploader = this;
			uploader.stop();
			uploader.form.remove();
			uploader = null;
		},
		'success' : function (callback) {
			var uploader = this;
			if ($.isFunction(callback)) {
				uploader.setting.success = function (res) {
					callback(res);
				};
			}
		},
		'error' : function (callback) {
			var uploader = this;
			if ($.isFunction(callback)) {
				uploader.setting.error = function (err) {
					callback(err);
				};
			}
		},
		'change' : function (callback) {
			var uploader = this;
			if ($.isFunction(callback)) {
				uploader.setting.change = callback;
			}
		},
		// 重置file
		'refreshFile' : function () {
			var uploader = this;
			uploader.input.val('');
		}
	};

	// helper
	// 
	function findzIndex($node) {
		var parents = $node.parentsUntil('body');
		var zIndex = 0;
		for (var i = 0; i < parents.length; i++) {
		  var item = parents.eq(i);
		  if (item.css('position') !== 'static') {
			zIndex = parseInt(item.css('zIndex'), 10) || zIndex;
		  }
		}
		return zIndex;
	};

	// 生成随机id
	function createId(firstname) {
		var id = firstname + parseInt(new Date().getTime() * (Math.random() + 1),10);
		return id;
	};
	exports.Uploader = Uploader;
})(window,jQuery);