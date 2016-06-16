
module.exports = function(grunt) {

  require('jit-grunt')(grunt);
  // taskConfig
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name || pkg.version %> ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* <%= pkg.homepage %>\n' +
            // '* <%= pkg.author %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
            'applock.tech; */\n',
    //less to css
    less: {
      development: {
        options: {
          /*compress: true,
          yuicompress: true,
          optimization: 2,*/
          banner:'<%= banner %>' 
        },
        files: {
          "www/css/bootstrap.min.css": "dist/less/bootstrap.less", // destination file and source file
        }
      },
      compileMy: {
        options: {
          /*compress: true,
          yuicompress: true,
          optimization: 2,*/
          banner:'<%= banner %>' 
        },
        files: {
          "www/css/style.css": "dist/less/style.less", 
        }
      }
    },
    // Task concat    
    concat: {  
      options: {  
      },  
      dist: {  
        src: ['dist/js/*.js'],//source
        dest: 'www/js/bootstrap-custom.js'//destination
      }  
    },  

    // Task jsmin
    uglify: {
      options: {
        mangle: false,
        banner:'<%= banner %>'
      },
      build: {
      	src: ['dist/js/*.js'],
      	dest: 'www/js/bootstrap.min.js'
      }
    },

    // Task htmlmin
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true,
          minifyJS: true,
          removeAttributeQuotes: true,
          removeComments: true
        },
        expand: true,
        cwd: 'dist/html',
        dest: 'www',
        src: ['*.html']
      }
    },

    // Task cssmin
    cssmin:{
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css'],
          dest: 'www/css',
          // ext: '.css'
        }]
      }
    },

    csslint:{
      options:{
        csslintrc: 'dist/less/.csslint'
      },
      build: ['www/css/*.css']
    },

    // Task imagemin
     imagemin: {
      dist: { // Target
        options: { // Target options
          optimizationLevel: 3
        },
        files:[
          {
            expand: true,
            cwd: 'dist/images',//source
            src: ['images/*.{png,jpg,jpeg}'], 
            dest: 'www/images' // destination
          }
        ]
      }
    },

    watch: {
      client: {
        files: ['dist/html/*.html', 'dist/css/*', 'dist/js/*', 'dist/images/**/*','dist/less/*'],
        options: {
          livereload: true
        }
      },
      styles: {
        files: ['dist/less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });
 
  
  // grunt.registerTask('live', ['watch']);
  grunt.registerTask('live', ['less','watch']);
  grunt.registerTask('bulid', ['imagemin','cssmin','uglify']);
};