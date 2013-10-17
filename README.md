#YouTang UED 团队

---
目录暂时分为**lib**,**plugin**,和**src**，**lib**中放置类库和框架级别的js文件,**plugin**中放置开源的或者已经开发完成的组件,**src**中放置开发中的组件。

---

###引用的文件
- jquery
- jquery.validation[github](https://github.com/jzaefferer/jquery-validation),[api](http://jqueryvalidation.org/validate),[doc](http://jqueryvalidation.org/reference/)
- swfUploader(正准备逐步使用upload替换)
- template(模版引擎)
- placeholder(html5支持插件)[github](https://github.com/mathiasbynens/jquery-placeholder)
- jcorp(头像裁剪的插件)
- ZeroClipboard(flash完成复制)


###目前已经完成的文件

- dialog(包括了layer,dialog,tips相关js)
- upload(上传组件,包括一个核心的``upload.js``和一个待改进的``mediaUploader-v2.js``)

###todo
- updateLayer(上传弹层)
- validation-plugin(基于``jquery.validation``完成的公用验证组件，避免每次都手写验证)
- stylus编译css
- commen.css重构
- 使用grunt构建项目
