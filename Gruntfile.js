module.exports = function (grunt) {
 
    grunt.initConfig({
        uncss: {
            dist: {
                files: [
                    { src: 'index_dev.html', dest: 'cleancss/design.css' }
                ]
            }
        },
        cssmin: {
            dist: {
                files: [
                    { src: 'cleancss/design.css', dest: 'cleancss/design.css' }
                ]
            }
        }
    });
 
    // Load the plugins
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
 
    // Default tasks.
    grunt.registerTask('default', ['uncss', 'cssmin']);
};