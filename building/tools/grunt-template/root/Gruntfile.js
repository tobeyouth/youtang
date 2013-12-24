/**
 * grunt模板
 * 所有项目的grunt都基于此进行拓展或使用
 *
 * 2013 11 24
 * by jn
 */
'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		// 每个项目有单独的project.json，用户定义项目的信息
		'pkg' : grunt.file.readJSON('{% project %}'),
		// 每次发布都会更新version.json这个文件
		'versions' : grunt.file.readJSON('{% version %}'),
		// 注释
		'banner' : 	'/** <%= pkg.name %> - v<%= pkg.version %>\n' + 
					' * <%= pkg.description %>\n' + 
					' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
					' * <%= pkg.author || pkg.author.name  %>\n' + 
					'**/',
		// 声明task
		'transport' : {
			'options' : {
				'alias' : {
					'jquery': 'libs/jquery/1.5/jquery.js'
				},
				'idleading' : '<% pkg.name %>-v<% pkg.version %>',
				'debug' : false
			},
			'src' : {
				'files' : {
					'cwd': '',
					'src': ['**/*.js'],
					'dest': './../.sea-debug/<%= pkg.name %>/'
				}
			}
		},
		'jshint' : {
			// 要检测的js文件，这里默认是全部js文件
			'files': ['**/**/*.js'],
			// 这里是jshint的检测规则
			// configure JSHint (documented at http://www.jshint.com/docs/)
			'options': {
				'globals': {
					'jQuery': true,
					'console': true,
					'module': true
				}
			 }
		},
		'qunit' : {
			'files': ['./../test/**/*.html']
		},
		'stylus' : {
			'options' : {
				'compress' : true,
				'paths' : [], // 要进行import的文件的地址
				'import' : [], // 默认制定的import项目
				'embedding' : null, // 解析url地址
			},
			// 这里配置stylus要进行compile的路径
			'files' : {
				'./../<%= pkg.name %>/**/css/*.css' : './../<%= pkg.name %>/**/stylus/*.stylus'
			}
		},
		'concat' : {
			'options' : {
				'separator': ';' // 在文件与文件之间添加的分隔符
			},
			'dist': {
				// 请自行填入要合并的文件路径
				'./../dist/<%= pkg.name %>/*/**/*.js' : ['./../<%= pkg.name %>/*/**/*.js']
			}
		},
		// 混淆js文件
		'uglify' : {
			'options': {
				// 此处定义的banner注释将插入到输出文件的顶部
				'banner': '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			'dist': {
				'files': {
					// 这里压缩contact中合并的文件
			    	'./../dist/<%= pkg.name %>/**/*.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		// 压缩文件
		'compress' : {
			'options' : {
				'mode' : 'gzip'
			},
			'expend' : true,
			'src' : ['**/*'],
			'dest' : './../dist/<%= pkg.name %>/**/*'
		},
		'watch' : {
			'files': ['<%= jshint.files %>'],
			'tasks': ['transport','jshint','stylus','concat','uglify','copy']
		},
		'copy' : {
			'src' : [],
			'dest' : []
		},
		'clean' : {

		}
	});

	// 载入依赖插件
	grunt.loadNpmTasks('grunt-cmd-transport');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');

	// 默认执行
	var defaultTask = ['transport','jshint','stylus','concat','uglify','copy','clean','watch'];
	// 仅仅是watch
	var watchTask = ['watch'];
	// 构建项目
	var buildTask = ['transport','jshint','stylus','concat'];
	// 发布项目
	var deployTask = ['qunit','copy','clean'];

	// 定义执行task
	grunt.registerTask('default', defaultTask);
	grunt.registerTask('watch', watchTask);
	grunt.registerTask('build', buildTask);
	grunt.registerTask('deploy',deployTask);

};