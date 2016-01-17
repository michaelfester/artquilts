var artistDetails = function(filterCopyrighted) {
    return {
        'cezanne':      { name:'Cézanne',      born:'1839', died:'1906', isMain:true,  license:'public'},
        'monet':        { name:'Monet',        born:'1840', died:'1926', isMain:filterCopyrighted, license:'public'},
        'schiele':      { name:'Schiele',      born:'1890', died:'1918', isMain:true,  license:'public'},
        'rembrandt':    { name:'Rembrandt',    born:'1606', died:'1669', isMain:true,  license:'public'},
        'goya':         { name:'Goya',         born:'1746', died:'1828', isMain:true,  license:'public'},
        'degas':        { name:'Degas',        born:'1834', died:'1917', isMain:filterCopyrighted, license:'public'},
        'basquiat':     { name:'Basquiat',     born:'1960', died:'1988', isMain:false, license:'copyrighted'},
        'caravaggio':   { name:'Caravaggio',   born:'1571', died:'1610', isMain:false, license:'public'},
        'davinci':      { name:'Da Vinci',     born:'1452', died:'1519', isMain:false, license:'public'},
        'doig':         { name:'Doig',         born:'1959', died:'',     isMain:false, license:'copyrighted'},
        'duchamp':      { name:'Duchamp',      born:'1887', died:'1968', isMain:false, license:'copyrighted'},
        'elgreco':      { name:'El Greco',     born:'1541', died:'1614', isMain:false, license:'public'},
        'ernst':        { name:'Ernst',        born:'1891', died:'1976', isMain:false, license:'copyrighted'},
        'fischl':       { name:'Fischl',       born:'1948', died:'',     isMain:false, license:'copyrighted'},
        'freud':        { name:'Freud',        born:'1922', died:'2011', isMain:false, license:'copyrighted'},
        'gauguin':      { name:'Gauguin',      born:'1848', died:'1903', isMain:false, license:'public'},
        'giotto':       { name:'Giotto',       born:'1266', died:'1337', isMain:false, license:'public'},
        'guston':       { name:'Guston',       born:'1913', died:'1980', isMain:false, license:'copyrighted'},
        'huizong':      { name:'Huizong',      born:'1082', died:'1135', isMain:false, license:'copyrighted'},
        'ingres':       { name:'Ingres',       born:'1800', died:'1867', isMain:false, license:'public'},
        'klein':        { name:'Klein',        born:'1928', died:'1962', isMain:false, license:'copyrighted'},
        'klimt':        { name:'Klimt',        born:'1862', died:'1918', isMain:false, license:'public'},
        'kooning':      { name:'Kooning',      born:'1904', died:'1997', isMain:false, license:'copyrighted'},
        'koons':        { name:'Koons',        born:'1955', died:'',     isMain:false, license:'copyrighted'},
        'manray':       { name:'Man Ray',      born:'1890', died:'1976', isMain:false, license:'copyrighted'},
        'matisse':      { name:'Matisse',      born:'1869', died:'1954', isMain:true,  license:'copyrighted'},
        'miro':         { name:'Miró',         born:'1893', died:'1983', isMain:false, license:'copyrighted'},
        'mondrian':     { name:'Mondrian',     born:'1872', died:'1944', isMain:false, license:'copyrighted'},
        'nolde':        { name:'Nolde',        born:'1780', died:'1956', isMain:false, license:'copyrighted'},
        'ofili':        { name:'Ofili',        born:'1968', died:'',     isMain:false, license:'copyrighted'},
        'picasso':      { name:'Picasso',      born:'1881', died:'1973', isMain:true,  license:'copyrighted'},
        'pollock':      { name:'Pollock',      born:'1912', died:'1956', isMain:false, license:'copyrighted'},
        'manet':        { name:'Manet',        born:'1832', died:'1883', isMain:false, license:'public'},
        'michelangelo': { name:'Michelangelo', born:'1475', died:'1564', isMain:false, license:'public'},
        'raphael':      { name:'Raphael',      born:'1483', died:'1520', isMain:false, license:'public'},
        'rousseau':     { name:'Rousseau',     born:'1844', died:'1910', isMain:false, license:'public'},
        'rothko':       { name:'Rothko',       born:'1903', died:'1970', isMain:false, license:'copyrighted'},
        'turner':       { name:'Turner',       born:'1775', died:'1851', isMain:false, license:'public'},
        'tuymans':      { name:'Tuymans',      born:'1958', died:'',     isMain:false, license:'copyrighted'},
        'vangogh':      { name:'Van Gogh',     born:'1853', died:'1890', isMain:false, license:'public'},
        'velazquez':    { name:'Velazquez',    born:'1599', died:'1660', isMain:false, license:'public'},
        'warhol':       { name:'Warhol',       born:'1928', died:'1987', isMain:false, license:'copyrighted'},
        'weiwei':       { name:'Weiwei',       born:'1957', died:'',     isMain:false, license:'copyrighted'},
        'yamagata':     { name:'Yamagata',     born:'1948', died:'',     isMain:false, license:'copyrighted'}
    };
}

var pick = function(obj,keys) {
    var copy = {};
    for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if(key in obj) copy[key] = obj[key];
    }
    return copy;
};

var extractData = function(filename, relativePath) {
    // A filename has the form "1905 - Acrobate et jeune arlequin - 105x76cm - Gouache on cardboard.jpg"
    var extension = filename.split(".").slice(-1)[0];
    var chunks = filename.replace("." + extension, "").split(" - ").map(function(chunk) { return chunk.trim(); });
    var size = chunks.length;
    var year = size > 0 ? chunks[0] : "Unknown";
    var title = size > 1 ? chunks[1] : "Unknown";
    var dimensions = size > 2 ? chunks[2] : "Unknown";
    var materials = size > 3 ? chunks[3] : "Unknown";

    var tooltipContents = "<p class=\"year\">"+year+"</p><p class=\"title\">"+title+"</p>";
    if(dimensions != "Unknown") tooltipContents += "<p class=\"dimensions\">" + dimensions + "</p>";
    if(materials != "Unknown") tooltipContents += "<p class=\"materials\">" + materials + "</p>";

    var fancyboxCaption = year + " - " + title + " - " + ((dimensions == "Unknown") ? "Dimensions: unknown" : dimensions) + " - " + ((materials == "Unknown") ? "Materials: unknown" : materials);

    return {
        file:            relativePath + filename,
        thumbFile:       relativePath + "thumbs/" + filename,
        year:            year,
        title:           title,
        dimensions:      dimensions,
        materials:       materials,
        tooltipContents: tooltipContents,
        fancyboxCaption: fancyboxCaption
    };
}

var getDataFromFolder = function(grunt,folderName) {
    var expanded = grunt.task.normalizeMultiTaskFiles(['build/img/'+folderName+'/*.jpg','build/img/'+folderName+'/*.png']);
    var filenames = expanded.map(function(files) { return files.src })[0].sort();
    return filenames.map(function(filename) { return extractData(filename.split("/").slice(-1)[0], 'img/'+folderName+'/'); });
}

var getImageResizeFileList = function(artistIds) {
    return artistIds.map(function(artistId) {
        return {
            expand: true,
            cwd: 'data/'+artistId+'/',
            src: ['*.jpg','*.png'],
            dest: 'data/'+artistId+'/thumbs/'
        }
    });
}

var getImageResizeParams = function(artistId) {
    return {
        options: {
            height: 60,
            quality: 0
        },
        files: getImageResizeFileList([artistId])
    };
}

var getJadeParams = function(grunt, filterCopyrighted, gaTrackingCode) {
    if(!gaTrackingCode) gaTrackingCode = 'UA-XXXXX-X';
    var details = artistDetails(filterCopyrighted);
    if(filterCopyrighted) {
        var ids = Object.keys(details).filter(function(id){ return details[id].license == "public"; });
        details = pick(details, ids);
    }

    var files = Object.keys(details).map(function(artistId) { return { src:['src/html/artist.jade'], dest:'build/' + artistId + '.html' }; });
    files.push({ src:['src/html/index.jade'], dest:'build/index.html' });
    return {
        files: files,
        options: {
            client: false,
            data: function(dest, src) {
                var page = dest.split('/').slice(-1)[0].split('.')[0];
                if(page == "index") {
                    return {artists: details, gaTrackingCode: gaTrackingCode};
                } else {
                    var info = details[page];
                    info["artworks"] = getDataFromFolder(grunt, page);
                    return {artist: info, artists: details, gaTrackingCode: gaTrackingCode};
                }
            }
        }
    }
}

var getThumbFiles = function() {
    var files = [];
    var details = artistDetails(false);
    var artistIds = Object.keys(details);
    for(var i = 0; i < artistIds.length; i++) {
        var artistId = artistIds[i];
        files.push({ expand: true, cwd: 'data/'+artistId+'/thumbs', src: ['**'], dest: 'build/img/'+artistId+'/thumbs' });
    }
    return files;
}

module.exports = function(grunt) {

    JS_VENDOR_LIBS = [
        'bower_components/modernizr/modernizr.js',
        'bower_components/tooltipster/js/jquery.tooltipster.js',
        'bower_components/fancybox/source/jquery.fancybox.pack.js',
        'bower_components/underscore/underscore.js'
    ];

    CSS_VENDOR_LIBS = [
        'bower_components/normalize-css/normalize.css',
        'bower_components/tooltipster/css/tooltipster.css',
        'bower_components/fancybox/source/jquery.fancybox.css',
        'src/css/vendor/responsive-gs.css'
    ];

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            main: {
                files: {
                    'build/js/vendor.js': JS_VENDOR_LIBS
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'build/css/vendor.css': CSS_VENDOR_LIBS
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            js: {
                // Uglify is too slow to run on all JavaScript
                // files, so we uglify only in 'dist' mode
                src: JS_VENDOR_LIBS,
                dest: 'build/js/vendor.js'
            },
            css: {
                // Uglify is too slow to run on all JavaScript
                // files, so we uglify only in 'dist' mode
                src: CSS_VENDOR_LIBS,
                dest: 'build/css/vendor.css'
            }
        },
        jade: {
            nofilter:getJadeParams(grunt, false, grunt.option('gaTrackingCode')),
            filter:getJadeParams(grunt, true, grunt.option('gaTrackingCode'))
        },
        compass: {
            dev: {
                options: {
                        sassDir: 'src/css',
                        cssDir: 'build/css'
                }
            },
            dist: {
                options: {
                        sassDir: 'src/css',
                        cssDir: 'build/css'
                }
            }
        },
        coffee: {
            dev: {
                options: {
                    sourceMap: true
                },
                files: {
                    'build/js/main.js': ['src/js/*.coffee']
                }
            },
            dist: {
                options: {
                    sourceMap: false
                },
                files: {
                    'build/js/main.js': ['src/js/*.coffee']
                }
            }
        },
        imagemin: {
            main: {
                options: {
                    optimizationLevel: 3 // 0-7
                },
                files: [{
                        expand: true,
                        cwd: 'src/img/',
                        src: '*',
                        dest: 'build/img'
                }]
            }
        },
        image_resize: {
            all: {
                options: {
                    height: 60,
                    quality: 0
                },
                files: getImageResizeFileList(Object.keys(artistDetails(false)))
            },
            artist: getImageResizeParams(grunt.option('artistId')),
        },
        copy: {
            dev: {
                files: [
                    {expand: true, cwd: 'src/static/', src: ['**'], dest: 'build/'},
                    {expand: true, cwd: 'src/img/', src: ['**'], dest: 'build/img/'},
                    {expand: false, src: ['bower_components/jquery/jquery.min.js'], dest: 'build/js/vendor/jquery.min.js'},
                    {expand: true, cwd: 'bower_components/fancybox/source/', src: ['*.gif','*.png'], dest: 'build/css/'}
                ]
            },
            dist: {
                files: [
                    {expand: true, cwd: 'src/static/', src: ['**'], dest: 'build/'},
                    {expand: false, src: ['bower_components/jquery/jquery.min.js'], dest: 'build/js/vendor/jquery.min.js'},
                    {expand: true, cwd: 'bower_components/fancybox/source/', src: ['*.gif','*.png'], dest: 'build/css/'}
                ]
            },
            img: {
                files: [
                    {expand: true, cwd: 'src/img/', src: ['**'], dest: 'build/'}
                ]
            },
            data: {
                files: [
                    {expand: true, cwd: 'data/'+grunt.option('artistId'), src: ['**'], dest: 'build/img/'+grunt.option('artistId')}
                ]
            },
            thumbs: {
                files: getThumbFiles()
            }
        },
        watch: {
            html: {
                files: ['src/html/*', 'src/html/**/*'],
                tasks: ['jade'],
            },
            css: {
                files: ['src/css/*', 'src/css/**/*'],
                tasks: ['compass'],
            },
            js: {
                files: ['src/js/*', 'src/js/**/*'],
                tasks: ['coffee'],
            },
            img: {
                files: ['src/img/*', 'src/img/**/*'],
                tasks: ['copy:img'],
            },
            image_resize: {
                files: ['data/**/*'],
                tasks: ['image_resize'],
            },
            static: {
                files: ['src/static/*', 'src/static/**/*'],
                tasks: ['copy'],
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-image-resize');

    // Default tasks
    grunt.registerTask('default', ['copy:dev','compass:dev','coffee:dev','concat','jade:nofilter']);
    grunt.registerTask('filter', ['copy:dev','compass:dev','coffee:dev','concat','jade:filter']);
    grunt.registerTask('dist', ['copy:dist','compass:dist','coffee:dist','cssmin','uglify','imagemin','image_resize','copy:data','jade:nofilter']);
};