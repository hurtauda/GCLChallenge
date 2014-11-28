module.exports = function (grunt) {
 
    grunt.initConfig({
        uncss: {
            dist: {
                files: [
                    { src: 'index_dev.html', dest: 'build/design.css' }
                ]
            }
        },
        cssmin: {
            dist: {
                files: [
                    { src: 'build/design.css', dest: 'build/design.css' }
                ]
            }
        },
        uglify: {
            my_target: {
                files: {
                    'build/script.min.js': ['js/slideshow.js']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'index.html': 'index_prd.html',
                    'addimage.html': 'upload_prd.html'
                }
            }
        }
    });
 
    // Load the plugins
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
 
    // Default tasks.
    grunt.registerTask('default', ['uncss', 'cssmin', 'uglify', 'htmlmin']);
};