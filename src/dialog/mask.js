/**
 * 一个遮罩层
 * 用于遮罩页面
 *
 * 2013 10 14 
 * by jn
 */
(function (exports,$) {

	var maskId = 0;

	var tpl = '<div class="mask"></div>';

	var defaultSetting = {
		'root' : 'body', // 要遮罩的根节点
		'zIndex' : 1000,
		'color' : '#333',
		'opacity' : 0.5,
		'position' : 'fixed'
	};
	var Mask = function (setting) {
		maskId += 1;
		this.setting = $.extend({},defaultSetting,setting);
		this.opening = false; // 是否在打开状态
		this.rendered = false; // 是否已经插入到dom中
		this.id = 'mask-' + maskId;
	};

	Mask.prototype = {
		'constructor' : Mask,
		'open' : function () {
			var mask = this,
				root = $(mask.setting.root),
				dom = $(tpl);

			if (!mask.rendered) {
				dom.appendTo(root);
				mask.rendered = true;
				mask.dom = dom;
			};

			dom.css({
				'width' : '100%',
				'height' : '100%',
				'position' : mask.setting.position,
				'top' : '0',
				'left' : '0',
				'backgroundColor' : mask.setting.color,
				'opacity' : mask.setting.opacity,
				'zIndex' : mask.setting.zIndex
			}).show();

			mask.opening = true;
			return mask
		},
		'close' : function (destroy) {
			var mask = this;
			mask.dom.remove();
			mask.opening = false;
			mask = null;
		}
	};

	exports.Mask = Mask;

})(window,jQuery);