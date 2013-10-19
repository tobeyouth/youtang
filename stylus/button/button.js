
var stylus = require('stylus'),
	fs = require('fs'),
	files = fs.readdirSync(__dirname);

files.forEach(function (file) {
	var fileType = file.split('.').pop();
	if (fileType == 'styl') {
		fs.readFile(__dirname + '/' + file,'utf8',function (err,data) {
			
			console.log(data);

			stylus(data).render(function (err,css) {
				console.log(css)
				var _fileName = file.split('.styl')[0] + '.css';
				fs.writeFile(_fileName,css,function () {
					console.log('complete ' + _fileName + '!');
				});
			})
		});
	}
});

