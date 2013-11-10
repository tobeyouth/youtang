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
	var wrapTpl = '<div class="Y_commenTips <%= tipClass %> <%= arrow %>-tip" id="<%= id %>">' + 
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
		'trigger' : '', // 触发元素
		'style' : {
			'position' : 'absolute'
		},
		'horizontal' : '0', // 水平偏移位置,正数为向上
		'vertical' : '0', // 垂直偏移位置,正数为向左
		'arrow' : 'bottom', // 箭头方向，分别是bottom,top,left,right四个值
		'tipClass' : '',
		'id' : '',
		'open' : null,
		'close' : null
	};
	// 自动获取位置的tips方法
	function Tips(setting) {
		this.setting = $.extend(true,{},defaultSetting,setting,true);
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
				fixedTop,fixedLeft,style;


			// 更新四个方向
			if (arrow === 'bottom') {
				fixedTop = top - layerDom.outerHeight() - 7 - vertical;
				fixedLeft = left + trigger.outerWidth() / 2 - layerDom.outerWidth() / 2 - horizontal;
			} else if (arrow === 'top') {
				fixedTop = top + trigger.outerHeight() + 7 - vertical;
				fixedLeft = left + trigger.outerWidth() / 2 - layerDom.outerWidth() / 2 - horizontal;
			} else if (arrow === 'left') {
				fixedTop = top + trigger.outerHeight() / 2 - layerDom.outerHeight() / 2 - vertical;
				fixedLeft = left + trigger.outerWidth() + 7 - horizontal;
			} else if (arrow === 'right') {
				fixedTop = top + trigger.outerHeight() / 2 - layerDom.outerHeight() / 2 - vertical;
				fixedLeft = left - layerDom.outerWidth() - 7 - horizontal;
			}
				
			style = $.extend({},tip.setting.style,{'left':fixedLeft,'top':fixedTop});
			
			tip.setStyle(style);
		});

		return tip;
	};
	exports.Tips = Tips;

})(window,jQuery);