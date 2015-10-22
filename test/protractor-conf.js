//exports.config = {
//  allScriptsTimeout: 11000,
//
//  specs: [
//    'e2e/*.js'
//  ],
//
//  // The address of a running selenium server.
//  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar', // Make use you check the version in the folder
//  //seleniumAddress: 'http://localhost:4444/wd/hub',
//
//  capabilities: {
//    'browserName': 'chrome'
//  },
//
//  chromeOnly: true,
//
//  baseUrl: 'http://localhost:8000/',
//
//  framework: 'jasmine',
//
//  jasmineNodeOpts: {
//    defaultTimeoutInterval: 30000
//  }
//};


exports.config = {
    // 这是用webstorm默认run的地址，根据启动服务不同需要修改 地址，端口等
    baseUrl: 'http://localhost:63342/angular-seed2-ionic/www/index.html',

    chromeOnly: true,

    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Framework to use. Jasmine 2 is recommended.
    framework: 'jasmine',

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['e2e/**/*.js'],

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
