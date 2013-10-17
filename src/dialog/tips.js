/**
 * 生成tips
 * 依赖于layer.js
 *
 * 2013 10 06
 * by jn
 */
(function (exports,$) {
	// 内部变量
	var tipsId = 0;

	// tip模版
	var wrapTpl = '<div class="Y_commenTips <%= tipClass %> <%= arrow %>" id="<%= id %>">' + 
					'<div class="bd">'+
					'</div>' + 
					'<% if (pointer) { %>' + 
						'<em class="pointer"></em>' + 
					'<% } %>' + 
					'<% if (closeBtn) { %>' + 
						'<a class="close" href="#"></a>' + 
					'<% } %>' + 
				  '</div>';

	// 默认设置
	var defaultSetting = {
		'pointer' : true, // 是否显示箭头
		'closeBtn' : true, // 是否显示关闭按钮
		'content' : '', // 内容
		'style' : {
			'left' : 'auto',
			'right' : 'auto',
			'top' : 'auto',
			'bottom' : 'auto',
			'width' : 'auto',
			'height' : 'auto',
			'position' : 'absolute'
		},
		'horizontal' : '0', // 水平偏移位置
		'vertical' : '0', // 垂直偏移位置
		'arrow' : 'bottom-tip',
		'tipClass' : '',
		'id' : '',
		'open' : null,
		'close' : null,
		'tipsId' : tipsId
	};
	// 自动获取位置的tips方法
	function Tips(setting) {
		this.setting = $.extend({},defaultSetting,setting);
		var	wrapRender = template.compile(wrapTpl),
			wrap = wrapRender(this.setting);

		this.wrap = $(wrap);
		this.init();
	};

	Tips.prototype = layer.prototype;
	Tips.prototype.constructor = Tips;
	Tips.prototype.init = function () {
		var tip = this,
			arrow = tip.setting.arrow || 'bottom',
			trigger = $(tip.setting.trigger),
			vertical = parseInt(tip.setting.vertical, 10),
			horizontal = parseInt(tip.setting.horizontal, 10),
			left = trigger.offset().left,
			top = trigger.offset().top;

		tip.trigger = trigger;
		tip.assemble(this.wrap,this.setting.content,function (wrap,content) {
			wrap.find('.bd').append(content);
		});
		tip.open(function (layerDom) {
			var layer = this,
				fixedTop = top - layerDom.height() - 7 + vertical,
				fixedLeft = left + trigger.width() / 2 - layerDom.width() / 2 + horizontal;
			tip.setStyle({
				'top' : fixedTop,
				'left' : fixedLeft
			});
		});
		return tip;
	};
	exports.Tips = Tips;

})(window,jQuery);