#弹出层

目前弹出层共有三种调用方式,``layer``,``dialog``,``tips``，分别适应于各种情况。

其中，``layer``是弹出层的核心模块，包括了弹出层的所有方法，其他的弹出层类别(``dialog``和``tips``)，都是将原型指向``layer``的原型，同时提供了一些其他方法。

另外，``layer``在需要遮罩时会依赖``mask``组件（该组件只提供一个遮罩对象）。


####layer使用说明：

#####默认配置：
	
	var defaultSetting = {
		'cache' : false, // 关闭后是否保留弹层
		'hasMask' : true, // 是否调用遮罩
		// 位置信息
		'style' : {
			'left' : 'auto',
			'top' : 'auto',
			'right' : 'auto',
			'bottom' : 'auto',
			'width' : 'auto',
			'height' : 'auto',
			'zIndex' : '1001'
		},
		// 各种回调和方法
		'beforeOpen' : null, //fun, open之前的回调
		'open' : null, //fun, open之后的回调
		'close' : null, //fun, 关闭之后的回调
		'wrap' : null, //string || fun, 弹出层的外壳
		'content' : null, // string || fun，弹出层的内容
		'assemble' : null // fun,组装wrap和content
	};

#####可用方法：
``layer``提供了目前弹出层所需要的所有基本方法类型，具体方法如下：

-	render ： 在``open``的时候也会触发该方法，用一个状态``rendered``表示是否已经被渲染。``assemble``方法会将``renderead``置为true。

-	assemble (wrap:string||jqObj , content:string||jqObj , handler:fun)：如果传入``handler``（真正的拼接方法）的话，会直接将``wrap``和``content``交由``handler``处理，如果没有传入的话,``wrap``和``content``需为``jqObj``，会直接执行``wrap.append(content)``动作。

- setStyle(style:obj,callback:fun) : 对弹出层设置样式，可以在设置完样式之后执行回调

- open(callback:fun) : 显示弹出层，可以在显示之后执行回调

- close(callback:fun) : 关闭弹出层，可以在关闭之后执行回调

- setContent(content:string) : 插入内容

- destroy : 删除弹出层


####dialog的使用说明：

``dialog``适用于各种较大的弹出层，模板中有``确认``和``取消``的按钮配置。

#####默认配置：

	var defaultSetting = {
		'title' : '优堂提示',
		'dialogClass' : '', // 额外添加的class
		'dialogId' : '', // 给dialog添加的id
		'hasTitle' : true, // 是否包含头部
		'hasBtn' : true, // 是否包括底部的按钮栏
		'hasMask' : true, // 是否包含遮罩层
		'confirmBtn' : true, // 是否包含确认按钮
		'confirmWord' : '确定', // 确定按钮文案
		'cancelBtn' : true, // 是否包含取消按钮
		'cancelWord' : '取消', // 取消按钮文案
		'closeBtn' : true, // 是否包含关闭按钮
		// dialog的样式
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



#####可用方法：
``dialog``原型直接指向``layer``的原型，所以上面``layer``所能使用的方法，``dialog``也都可以使用。

- confirm(callback:fun) : 直接进行``confirm``动作，回调函数会在这个动作执行时替代设置中的``confirm``执行

- cancel(callbak:fun) : 直接执行``cancel``动作，回调函数同上执行。


####tips使用说明：

``tips``适用于各种提示类的弹出层。

#####默认配置：

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
		'horizontal' : '0', // 水平偏移位置,正数为向上
		'vertical' : '0', // 垂直偏移位置,正数为向左
		'arrow' : 'bottom', // 箭头方向，分别是bottom,top,left,right四个值
		'tipClass' : '', // tips的class
		'id' : '', // 为tips添加的id
		'open' : null, // fun,打开之后的回调
		'close' : null // 关闭之后的回调
	};

#####可用方法：

``tips``没有单独定义的方法，全部基于``layer``。




####todo:

1. 模板的拆分
2. 定制样式
3. 根据选定的开发框架,``seajs``或者``requirejs进行模块化





