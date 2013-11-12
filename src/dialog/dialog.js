/**
 * 弹层
 * 继承自layer.js
 *
 * 2013 10 14
 * by jn
 */
(function (exports,$) {
	// 所有dialog的列表
	var dialogList = [];
	// 模版文件
	var dialogTpl = '<div class="Y_commenLayer <%= dialogClass %>" id="<%= dialogId %>">' + 
						'<% if (hasTitle) { %>' + 
							'<div class="hd"><%= title %></div>' + 
						'<% } %>' + 
						'<div class="inner-content">' + 
							// '<%== content %>' + 
						'</div>' + 
						'<% if (hasBtn) { %>' + 
							'<div class="ft">' + 
								'<% if (confirmBtn) { %>' +
									'<a href="#" class="blue-btn confirm"><%= confirmWord %></a>' +
								'<% } %>' +
								'<% if (cancelBtn) { %>' + 
									'<a href="#" class="gray-btn cancel"><%= cancelWord %></a>' +
								'<% } %>' +
							'</div>' + 
						'<% } %>' + 
						'<% if (closeBtn) { %>' + 
							'<a href="" class="close-btn"></a>' +
						'<% } %>' + 
					'</div>';

	// 默认设置
	var defaultSetting = {
		'title' : '优堂提示',
		'dialogClass' : '',
		'dialogId' : '',
		'hasTitle' : true, // 是否包含头部
		'hasBtn' : true, // 是否包括底部的按钮栏
		'hasMask' : true, // 是否包含遮罩层
		'confirmBtn' : true, // 是否包含确认按钮
		'confirmWord' : '确定', // 确定按钮文案
		'cancelBtn' : true, // 是否包含取消按钮
		'cancelWord' : '取消', // 取消按钮文案
		'closeBtn' : true, // 是否包含关闭按钮
		'style' : {
			'zIndex' : '1002',
			'width' : '50%',
			'overflow' : 'hidden',
			'left' : '0',
			'top' : 'auto',
			'right' : '0',
			'bottom' : 'auto',
			'margin' : 'auto'
		},
		// 回调
		'confirm' : null, // 点击确认的回调
		'concel' : null // 点击取消的回调
	};

	function Dialog(setting) {
		this.setting = $.extend({},defaultSetting,setting);
		var render = template.compile(dialogTpl),
			wrap = render(this.setting);
		this.wrap = $(wrap);
		this.init();
	};

	Dialog.prototype = layer.prototype;
	$.extend(Dialog.prototype,{
		'constructor' : Dialog,
		'init' : function () {
			var dialog = this;
			// 拼装模版和内容
			dialog.assemble(dialog.wrap,dialog.setting.content,function (wrap,content) {
				wrap.find('.inner-content').append(content);
			});

			dialog.setStyle(dialog.setting.style);

			dialog.open();

			// 绑定事件
			dialog.dom.delegate('.confirm','click',function (e) {
				e.preventDefault();
				dialog.confirm();
			});
			dialog.dom.delegate('.cancel','click',function (e) {
				e.preventDefault();
				dialog.cancel();
			});
			dialog.dom.delegate('.close-btn','click',function (e) {
				e.preventDefault();
				dialog.cancel();
			})
			return dialog;
		},
		'confirm' : function (callback) {
			var dialog = this;

			if ($.isFunction(callback)) {
				callback.call(dialog);
			} else if ($.isFunction(dialog.setting.confirm)) {
				dialog.setting.confirm.call(dialog);
			};

			dialog.close();

			return dialog;
		},
		'cancel' : function (callback) {
			var dialog = this;

			if ($.isFunction(callback)) {
				callback.call(dialog);
			} else if ($.isFunction(dialog.setting.cancel)) {
				dialog.setting.cancel.call(dialog);
			};

			dialog.close();

			return dialog;
		}
	});
	
	exports.Dialog = Dialog;

})(window,jQuery);