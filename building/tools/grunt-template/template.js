/**
 * grunt模板
 *
 * 2013 11 23
 * 
 */

'use strict';

exports.description = 'Create gruntFile.js for youtang front-end developer!';

exports.notes = ''

exports.after = 'enjoy it!';

exports.warnOn = '*';

exports.template = function (grunt, init, done) {
	var files = {};
	var licenses = ['MIT'];
	init.addLicenseFiles(files, licenses);

	// 初始化流程
	init.process(
		{
			'type' : 'youtangUED',
			'team' : 'youtangUED',
			'author' : 'youtangUED'
		},
		// 初始化参数设置
		[	
			// 项目名称
			// 必填
			init.prompt('name'),
			// 项目介绍
			init.prompt('description'),
			// 项目版本
			init.prompt('version','0.0.1'),
			init.prompt('licenses', 'MIT'),
			// 关键词
			init.prompt('keywords');
			// 开发者信息
			init.prompt('author_name'),
		],
		// 初始化配置
		function (error,props) {
			// 生成Gruntfile.js
			props.projectjson = props.name + '-project.json';

			// 根据root中的Gruntfile.js模板生成项目的Gruntfilejs
			var files = init.filesToCopy(props);
			init.copyAndProcess(files, props);
			// 生成开源信息文件
			init.addLicenseFiles(files, props.licenses);

			// 写入package.json
			init.writePackageJSON('package.json', {
				name: props.name || 'youtangUED',
				version: props.version || '0.0.1',
				npm_test: 'grunt qunit',
				node_version: '>= 0.8.0',
				keywords : props.keywords.split(','),
				devDependencies: {
					'grunt-cmd-transport': '~0.4.0',
					'grunt-contrib-jshint': '~0.6.0',
					'grunt-contrib-qunit': '~0.2.0',
					'grunt-grunticon-stylus' : '~0.1.0',
					'grunt-contrib-concat': '~0.3.0',
					'grunt-contrib-imagemin' : '~0.4.0',
					'grunt-contrib-uglify': '~0.2.0',
					'grunt-contrib-watch': '~0.4.0',
					'grunt-contrib-clean': '~0.4.0'
				},
			});
			done();
		});
};