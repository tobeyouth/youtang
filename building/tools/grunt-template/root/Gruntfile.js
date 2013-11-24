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
		'pkg' : grunt.file.readJSON('{% projectjson %}'),
		// 注释
		'banner' : 	'/*! <%= pkg.name %> - v<%= pkg.version %>' + 
					'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
					'<%= pkg.author || pkg.author.name  %>' + 
					'*/',
		// 声明task
		'transport' : {
			'options' : {

			},

		},
		'jshint' : {

		},
		'qunit' : {

		},
		'stylus' : {

		},
		'concat' : {
			'src' : [],
			'dest' : []
		},
		'uglify' : {
			'src' : [],
			'dest' : []
		},
		'imagemin' : {
			'src' : [],
			'dest' : []
		},
		'watch' : {
			'src' : [],
			'dest' : []
		},
		'clean' : {

		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
};