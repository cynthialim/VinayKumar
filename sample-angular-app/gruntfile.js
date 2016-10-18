/**
 * Created by kim.honoridez on 08/07/2015.
 */
(function () {
    'use strict';

    module.exports = function(grunt) {
        var fs = require('fs');

        var modules = [
            "**/*.js",
            "!**/*.ctrl.js",
            "!**/*.controller.js",
            "!**/*.svc.js",
            "!**/*.service.js",
            "!**/*.factory.js",
            "!**/*.config.js",
            "!**/*.main.js",
            "!**/*.directive.js"
        ];

        var htmlPkg = [
            {expand: true, flatten: false, cwd: "app/src/", src: ["**/*.html", "!**/*.web.html"], dest: 'dist/app/src/', filter: 'isFile', rename: rename }
        ];

        var htmlWeb = [
            {expand: true, flatten: false, cwd: "app/src/", src: ["**/*.html", "!**/*.pkg.html"], dest: 'dist/app/src/', filter: 'isFile', rename: rename }
        ];

        var filesMain = [
            {expand: true, flatten: false, cwd: "app/", src: "src/**/*.json", dest: 'dist/app/', filter: 'isFile'},
            {expand: true, flatten: false, cwd: "app/", src: "css/**/*", dest: 'dist/app/', filter: 'isFile'},
            {expand: true, flatten: false, cwd: "app/", src: "src/lib/**/css/**/*", dest: 'dist/app/', filter: 'isFile'},
            {expand: true, flatten: false, cwd: "app/", src: "src/lib/**/img/**/*", dest: 'dist/app/', filter: 'isFile'},
            {expand: true, flatten: false, cwd: "app/", src: "img/**/*", dest: 'dist/app/', filter: 'isFile'},
            {expand: true, flatten: false, cwd: "app/", src: "i18n/**/*", dest: 'dist/app/', filter: 'isFile'},
            {expand: true, flatten: false, cwd: "app/", src: "src/certificates/**/*", dest: 'dist/app/', filter: 'isFile'},
            {expand: true, flatten: false, src: "splash/**/*", dest: 'dist/', filter: 'isFile'}
        ];

        var jsPkg = [
            {expand: true, flatten: false, cwd: "app/src/", src: ["**/*.js", "!**/*.web.*.js", "!**/*.env?.*.js"], dest: 'dist/app/src/', filter: 'isFile', rename: rename },
            {expand: true, flatten: false, cwd: "app/", src: "ui-common/**/*.js", dest: 'dist/app/', filter: 'isFile', rename: rename }
        ];

        var jsWeb = [
            {expand: true, flatten: false, cwd: "app/src/", src: ["**/*.js", "!**/*.pkg.*.js", "!**/*.env?.*.js"], dest: 'dist/app/src/', filter: 'isFile', rename: rename },
            {expand: true, flatten: false, cwd: "app/", src: "ui-common/**/*.js", dest: 'dist/app/', filter: 'isFile', rename: rename }
        ];

        var jsPkgDarwin = [
            {expand: true, flatten: false, cwd: "app/src/", src: ["*.js", "!*.web.*.js"], dest: 'dist/app/src/', filter: 'isFile', rename: rename },
            {expand: true, flatten: false, cwd: "app/src/lib/", src: ["**/*.js", "!**/*.web.*.js"], dest: 'dist/app/src/lib/', filter: 'isFile', rename: rename },
            // {expand: true, flatten: false, cwd: "app/src/shared/", src: ["**/*.js", "!**/*.web.*.js", "!**/*.env?.*.js"], dest: 'dist/app/src/shared/', filter: 'isFile', rename: rename },
            {expand: true, flatten: false, cwd: "app/ui-common/", src: ["**/*.js", "!**/*.web.*.js"], dest: 'dist/app/ui-common/', filter: 'isFile', rename: rename }
        ];

        var jsWebDarwin = [
            {expand: true, flatten: false, cwd: "app/src/", src: ["*.js", "!*.pkg.*.js"], dest: 'dist/app/src/', filter: 'isFile', rename: rename },
            {expand: true, flatten: false, cwd: "app/src/lib/", src: ["**/*.js", "!**/*.pkg.*.js"], dest: 'dist/app/src/lib/', filter: 'isFile', rename: rename },
            {expand: true, flatten: false, cwd: "app/src/shared/", src: ["**/*.js", "!**/*.pkg.*.js", "!**/*.env?.*.js"], dest: 'dist/app/src/shared/', filter: 'isFile', rename: rename },
            {expand: true, flatten: false, cwd: "app/ui-common/", src: ["**/*.js", "!**/*.pkg.*.js"], dest: 'dist/app/ui-common/', filter: 'isFile', rename: rename }
        ];

        var x32NodeModules = [
            {expand: true, flatten: false, cwd: 'node_modules_x32/', src: "**/*", dest: 'dist/node_modules/'}
        ];

        // Initialize Grunt configuration
        grunt.initConfig({
            clean: {
                dist: {
                    src: ['dist']
                },
                release:{
                    src: ['release']
                },
                build: {
                    src: ['build']
                }
            },
            bower: {
                install: {
					options: {copy:false}
                }
            },
            bowercopy: {
                options: {
                    srcPrefix: 'bower_components'
                },
                scripts: {
                    options: {
                        destPrefix: 'dist/vendor'
                    },
                    files: {
                        'jquery/jquery.min.js': 'jquery/dist/jquery.min.js',
                        'angular/angular.min.js': 'angular/angular.min.js',
                        'angular/angular-route.min.js':'angular-route/angular-route.min.js'
                    }
                }
            },
            copy: {
                "completeSource": {
                    files: jsPkg.concat(htmlPkg).concat(filesMain)
                },
                "completeSourceDarwin": {
                    files: jsPkgDarwin.concat(htmlPkg).concat(filesMain)
                },
                "completeSourceWeb": {
                    files: jsWeb.concat(htmlWeb).concat(filesMain)
                },
                "completeSourceDarwinWeb": {
                    files: jsWebDarwin.concat(htmlWeb).concat(filesMain)
                },
                "main": {
                    files: jsPkg
                },
                "mainDarwin": {
                    files: jsPkgDarwin
                },
                "mainWeb": {
                    files: jsWeb
                },
                "mainDarwinWeb": {
                    files: jsWebDarwin
                },
                "env": {
                    files: []
                },
                "html": {
                    files: [
                        {expand: true, flatten: false, cwd: "app/", src: "src/**/*.html", dest: 'dist/app/', filter: 'isFile'}
                    ]
                },
                "data": {
                    files: [
                        {expand: true, flatten: false, cwd: "app/", src: "src/**/*.json", dest: 'dist/app/', filter: 'isFile'}
                    ]
                },
                "css": {
                    files: [
                        {expand: true, flatten: false, cwd: "app/", src: "css/**/*", dest: 'dist/app/', filter: 'isFile'}
                        , {expand: true, flatten: false, cwd: "app/", src: "src/lib/**/css/**/*", dest: 'dist/app/', filter: 'isFile'}
                    ]
                },
                "img": {
                    files: [
                        {expand: true, flatten: false, cwd: "app/", src: "img/**/*", dest: 'dist/app/', filter: 'isFile'}
                        , {expand: true, flatten: false, cwd: "app/", src: "src/lib/**/img/**/*", dest: 'dist/app/', filter: 'isFile'}
                    ]
                },
                "i18n": {
                    files: [
                        {expand: true, flatten: false, cwd: "app/", src: "i18n/**/*", dest: 'dist/app/', filter: 'isFile'}
                    ]
                },
                x32NodeModules: {
                    files: x32NodeModules
                },
                others: {
                    files: [
					    {expand: true, flatten: false, src: ["vendor/kendo/kendo.all.min.js","vendor/kendo/*.min.css", "vendor/kendo/Default/**/*", "vendor/kendo/images/**/*", "vendor/kendo/Silver/**/*", "vendor/kendo/textures/**/*"], dest: 'dist/'},
						{expand: true, flatten: false, src: "vendor/angular-ui-utils/**/*", dest: 'dist/'},
                        {expand: true, flatten: false, src: "vendor/socketjs/**/*", dest: 'dist/'},
                        {expand: true, flatten: false, src: "vendor/crypto/**/*", dest: 'dist/'},
                        {expand: true, flatten: false, src: "package.json", dest: 'dist/'},
                        {expand: true, flatten: false, src: "node_modules/**/*", dest: 'dist/'},
                        {expand: true, flatten: false, src: "vendor/tooltip/**/*", dest: 'dist/'},
                        {expand: true, flatten: false, src: "vendor/countdown/**/*", dest: 'dist/'},
                        {expand: true, flatten: false, cwd: "vendor/vertx3-eventbus-client/", src: "*.js", dest: 'dist/vendor/vertx/'}
                    ]
                },
                othersWeb: {
                    files: [
                        {expand: true, flatten: false, src: ["vendor/kendo/kendo.all.min.js","vendor/kendo/*.min.css", "vendor/kendo/Default/**/*", "vendor/kendo/images/**/*", "vendor/kendo/Silver/**/*", "vendor/kendo/textures/**/*"], dest: 'dist/'},
                        {expand: true, flatten: false, src: "vendor/angular-ui-utils/**/*", dest: 'dist/'},
                        {expand: true, flatten: false, src: "vendor/socketjs/**/*", dest: 'dist/'},
                        {expand: true, flatten: false, src: "vendor/crypto/**/*", dest: 'dist/'},
                        {expand: true, flatten: false, src: "vendor/tooltip/**/*", dest: 'dist/'},
                        {expand: true, flatten: false, src: "vendor/countdown/**/*", dest: 'dist/'},
                        {expand: true, flatten: false, cwd: "vendor/vertx3-eventbus-client/", src: "*.js", dest: 'dist/vendor/vertx/'}
                    ]
                },
                outer: {
                    files: [
                       /* {expand: true, flatten: false, src: "main.html", dest: 'dist/'},
                        {expand: true, flatten: false, src:"jquery-1.11.1-splash.min.js", dest: 'dist/'},
                        {expand: true, flatten: false, src:"snap.svg.js", dest: 'dist/'},
                        {expand: true, flatten: false, src:"enlivenem.js", dest: 'dist/'},
                        {expand: true, flatten: false, src: "mainApp.js", dest: 'dist/'}*/
                    ]
                },
                splash: {
                    files: [
                        {expand: true, flatten: false, src: "splash/**/*", dest: 'dist/', filter: 'isFile'}
                    ]
                },
                win32: {
                    files: [
                        //{expand: true, flatten: false, cwd: 'cache/0.13.0/win32', src: "**/*", dest: 'dist/'}
                        {expand: true, flatten: false, cwd: 'nwjs/v0.15.3/win32', src: "**/*", dest: 'dist/'}
                    ]
                },
                win64: {
                    files: [
                        //{expand: true, flatten: false, cwd: 'cache/0.13.0/win64', src: "**/*", dest: 'dist/'}
                        {expand: true, flatten: false, cwd: 'nwjs/v0.15.3/sdk', src: "**/*", dest: 'dist/'}
                    ]
                },
                osx: {
                    files: [
                        //{expand: true, flatten: false, cwd: 'cache/0.13.0/win64', src: "**/*", dest: 'dist/'}
                        {expand: true, flatten: false, cwd: 'nwjs/v0.15.3/osx', src: "**/*", dest: 'dist/'}
                    ]
                }
            },
            compress: {
                main: {
                    options: {
                        archive: 'release/tpcohcis-ent-client.zip'
                    },
                    files: [
                        {expand: true, src : ['**'], cwd : "dist/"} // includes files in path
                    ]
                }
            },
            includeSource: {
                options: {
                    basePath: 'dist',
                    baseUrl: '',
                    ordering: 'top-down',
                    templates: {
                        html: {
                            js: '<script src="{filePath}"></script>',
                            css: '<link rel="stylesheet" type="text/css" href="{filePath}" rel="preload"/>'
                        }
                    }
                },
                myTarget: {
                    files: {
                        'dist/index.html': 'index.tmp.html'
                    }
                }
            },

            watch: {
                options: {
                    livereload: true,
                    spawn: false
                },
                js: {
                    files: ['app/**/*.js'],
                    tasks: ['copy-main']
                },
                html: {
                    files: ['app/**/*.html'],
                    tasks: ['copy:html']
                },
                css: {
                    files: ['app/css/**/*.css'],
                    tasks: ['copy:css']
                },
                data: {
                    files: ['app/**/*.json', 'server/**/*.json'],
                    tasks: ['copy:data']
                },
                img: {
                    files: ['app/img/*.*'],
                    tasks: ['copy:img']
                },
                i18n: {
                    files: ['app/i18n/**/*.*'],
                    tasks: ['copy:i18n']
                },
                outer: {
                    files: ['main.html', "mainApp.js"],
                    tasks: ['copy:outer']
                },
                splash: {
                    files: ['splash/**/*.*'],
                    tasks: ['copy:splash']
                }
            },

            envMode: {
                locMode: ''
            }
        });

        var targetFiles = [];
        var depth = 0;
        var dirHierarchy = [];
		var callback = undefined;
		var done = undefined;
        var delimiter = "\\";

        if(process.platform === 'darwin' || process.platform === 'linux') {
            delimiter = "/";
        }

        function constructDir(srcDir, cb) {
			callback = cb;
            fs.readdir(srcDir, function (err, files) {
                depth++;
                subDirs(srcDir, files, '');
            });
        }

        function subDirs(srcDir, files, path) {
            if (files && containsException(path) === false) {
                var subDirPathList = [];
                var subDirList = [];

                // traverse file list
                for (var i = 0; i < files.length; i++) {
                    var full = srcDir + delimiter + path + files[i];

                    if (files[i] !== 'lib' && files[i] !== 'shared' &&
                            fs.lstatSync(full).isDirectory() === true &&
                            files[i].indexOf(".") < 0) {
                        var tempPath = path;
                        tempPath += delimiter;
                        tempPath += files[i];
                        subDirPathList.push(tempPath);
                        subDirList.push(files[i]);
                    }
                }

                if (subDirPathList.length > 0) {
                    crawl(srcDir, subDirPathList, 0);

                    if (path) {
                        writeFile(srcDir, path, subDirList);
                    }
                }
            }

            depth--;

            if (depth === 0) {
				done();
				callback();
                console.log("Finished");
                /*console.error(dirHierarchy.length);
                dirHierarchy = $filter('orderBy')(dirHierarchy);
                writeMe(dirHierarchy, 0);*/
            }
        }

        function containsException(path) {
            var retVal = false;
            var exceptions = [
                'clinicalComponents' + delimiter + delimiter + 'local',
                'clinicalComponents' + delimiter + delimiter + 'static' + delimiter + delimiter + 'programEnrolment',
                'icde'
            ];

            for (var i = 0; i < exceptions.length; i++) {
                if (path.indexOf(exceptions[i]) > -1) {
                    retVal = true;

                    break;
                }
            }

            return retVal;
        }

        function writeFile(srcDir, path, subDirList) {
            if (!subDirList || subDirList.length <= 0) {
                return;
            }

            // extract module from path
            var pathArr = path.split(delimiter);

            // construct module list
            var moduleList = "";
            for (var i = 0; i < subDirList.length; i++) {
                moduleList += "'" + subDirList[i] + "',";
            }
            moduleList = moduleList.substring(0, moduleList.length - 1);

            // construct content
            var content = "(function () { 'use strict';  angular.module('" + pathArr[pathArr.length - 2] + "', [" + moduleList + "]); })();";

            // construct config file path
            var filePath = srcDir + path + pathArr[pathArr.length - 2] + ".main.js";

            fs.writeFileSync(filePath, content);
        }

        function crawl(srcDir, list, idx) {
            if (idx < list.length && list[idx] !== 'lib' && list[idx] !== 'shared') {
                depth++;
                fs.readdir(srcDir + delimiter + list[idx], function (err, subFiles) {
                    crawl(srcDir, list, idx + 1);
                    subDirs(srcDir, subFiles, list[idx] + delimiter);
                });
            }
        }

        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-include-source');
        grunt.loadNpmTasks('grunt-contrib-compress');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-bowercopy');
        grunt.loadNpmTasks('grunt-bower-task');

        grunt.registerTask('build-dev-pkg', 'Build dev codes', function () {
			done = this.async();
            constructDir("app" + delimiter + "src" + delimiter, function () {

				console.log("Platform : " + process.platform);
                console.log("Environment : " + grunt.option('env'));
                grunt.config('copy.env.files', [{expand: true, flatten: false, cwd: "app/src/", src: ["**/*.env" + (grunt.option('env') || '1') + ".*.js"], dest: 'dist/app/src/', filter: 'isFile', rename: rename }]);

				if (process.platform === "win32") {
                    // Config to be used by grunt-watch to identify tasks to run upon trigger of event
                    grunt.config('envMode.locMode', 'build-dev-pkg');
                    
                    grunt.task.run(['clean', 'bower:install', 'copy:completeSource', 'copy:env', 'bowercopy', 'copy:others', 'copy:outer', 'includeSource']);
					if (process.env.hasOwnProperty('ProgramFiles(x86)') === true) {
						grunt.task.run(['copy:win64']);
					}
					else {
						grunt.task.run(['copy:win32']);
					}
                    grunt.task.run(['build-tpcohcis-client-manifest']);
				}
                else if (process.platform === "darwin" || process.platform === "linux") {
                    // Config to be used by grunt-watch to identify tasks to run upon trigger of event
                    grunt.config('envMode.locMode', 'build-dev-darwin-pkg');
                    
                    grunt.task.run(['clean', 'bower:install', 'copy:completeSourceDarwin', 'copy:env', 'bowercopy', 'copy:others', 'copy:outer', 'copy:osx', 'concat-main', 'includeSource']);
                }

				grunt.task.run(['watch']);
			});
        });

        grunt.registerTask('build-dev-web', 'Build dev codes', function () {
            done = this.async();
            constructDir("app" + delimiter + "src" + delimiter, function () {

                console.log("Platform : " + process.platform);
                console.log("Environment : " + grunt.option('env'));
                grunt.config('copy.env.files', [{expand: true, flatten: false, cwd: "app/src/", src: ["**/*.env" + (grunt.option('env') || '1') + ".*.js"], dest: 'dist/app/src/', filter: 'isFile', rename: rename }]);

                if (process.platform === "win32") {
                    // Config to be used by grunt-watch to identify tasks to run upon trigger of event
                    grunt.config('envMode.locMode', 'build-dev-web');
                    
                    grunt.task.run(['clean', 'bower:install', 'copy:completeSourceWeb', 'copy:env', 'bowercopy', 'copy:othersWeb', 'copy:outer', 'includeSource']);
                    if (process.env.hasOwnProperty('ProgramFiles(x86)') === true) {
                        grunt.task.run(['copy:win64']);
                    }
                    else {
                        grunt.task.run(['copy:win32']);
                    }
                    grunt.task.run(['build-tpcohcis-client-manifest']);
                }
                else if (process.platform === "darwin" || process.platform === "linux") {
                    // Config to be used by grunt-watch to identify tasks to run upon trigger of event
                    grunt.config('envMode.locMode', 'build-dev-darwin-web');
                    
                    grunt.task.run(['clean', 'bower:install', 'copy:completeSourceDarwinWeb', 'copy:env', 'bowercopy', 'copy:othersWeb', 'copy:outer', 'copy:osx', 'concat-main', 'includeSource']);
                }

                grunt.task.run(['watch']);
            });
        });

        grunt.registerTask('build-release-pkg', 'Build release codes', function () {
			done = this.async();
            constructDir("app" + delimiter + "src" + delimiter, function () {
                console.log("Environment : " + grunt.option('env'));
                grunt.config('copy.others.files', grunt.config('copy.others.files').concat(x32NodeModules));

				grunt.task.run(['clean', 'bower:install', 'copy:completeSourceDarwin', 'copy:env' ,'bowercopy', 'copy:others', 'copy:x32NodeModules', 'copy:outer', 'concat-main', 'includeSource']);
				grunt.task.run(['copy:win32']);
				grunt.task.run(['build-tpcohcis-client-manifest']);
				grunt.task.run(['compress']);
			});
        });
    };
})();