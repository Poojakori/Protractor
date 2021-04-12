// An example configuration file.
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');


exports.config = {
    directConnect: true,
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    
    //Capabilities to be passed to the webdriver instance.
    capabilities: {
      'browserName': 'chrome'
    },

    // parallel testing
  // capabilities : {
	// 	browserName : 'chrome',
	// 	shardTestFiles : true,
	// 	maxInstances : 2,
	// },


 //Multi browser testing
  // multiCapabilities: [
  //   {
  //     'browserName': 'chrome',
  //     specs: ['specAdd.js'],
  //   },
  //   {
  //     'browserName': 'firefox',
  //     specs: ['specSubt.js'],
  //   }
  // ],


  
    // Framework to use. Jasmine is recommended.
    framework: 'jasmine',
  
    // Spec patterns are relative to the current working directory when
    // protractor is called.
    //specs: ['specAdd.js','specSubt.js','specMul.js','specDiv.js','specMod.js'],
  specs: ['spec.js'],

  // suites: {
  //     functional: ['specAdd.js','specSubt.js','specMul.js','specDiv.js','specMod.js'],
  //     regression: ['spec.js'],
  //   }, // protractor conf.js --suite regression,exampleTS
  
  // beforeLaunch: function() {
  //   return new Promise(function(resolve){
  //     reporter.beforeLaunch(resolve);
  //   });
  // },

  // Assign the test reporter to each running instance
  onPrepare: function() {
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: './screenshots'
      })
    );
 },

  // Close the report after all tests finish
  // afterLaunch: function(exitCode) {
  //   return new Promise(function(resolve){
  //     reporter.afterLaunch(resolve.bind(this, exitCode));
  //   });
  // },

  //      new Jasmine2HtmlReporter({
    //    savePath: 'target/screenshots'
      
 

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
      defaultTimeoutInterval: 30000
    }
  };