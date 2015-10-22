'use strict';

/** http://docs.angularjs.org/guide/dev_guide.e2e-testing */
/**
 * 运行端到端测试前，首先需要把应用启动起来，服务启动地址与 protractor-conf.js内的baseUrl地址一致
 * */

describe('移动框架端到端测试', function () {

    /**路由测试*/
    it('默认首页的相对路径应该为：#/app/listrefresh', function () {
        browser.get('#/');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/app/listrefresh');
        });
    });
    it('简单列表的相对路径为 #//app/playlists', function () {
        browser.get('#/app/playlists');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/app/playlists');
        });
    });

    it('简单列表的详情页的相对路径为 #/app/playlists/motorola-xoom-with-wi-fi', function () {
        browser.get('#/app/playlists/motorola-xoom-with-wi-fi');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/app/playlists/motorola-xoom-with-wi-fi');
        });
    });

    it('表单元素的相对路径为 #/app/formelements', function () {
        browser.get('#/app/formelements');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/app/formelements');
        });
    });

    it('弹出层的相对路径为 #/app/actionsheet', function () {
        browser.get('#/app/actionsheet');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/app/actionsheet');
        });
    });


    it('列表选项按钮的相对路径为 #/app/listoption', function () {
        browser.get('#/app/listoption');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/app/listoption');
        });
    });


    it('布局的相对路径为 #/app/layout', function () {
        browser.get('#/app/layout');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/app/layout');
        });
    });


    it('tab的相对路径为 #/app/tabs/dash', function () {
        browser.get('#/app/tabs/dash');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/app/tabs/dash');
        });
    });

    it('动态幻灯片的相对路径为 #/app/slidebox', function () {
        browser.get('#/app/slidebox');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/app/slidebox');
        });
    });
    it('视图切换的相对路径为 #/view1', function () {
        browser.get('#/view1');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/view1');
        });
    });
    it('列表查找的相对路径为 #/app/search', function () {
        browser.get('#/app/search');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/app/search');
        });
    });
    it('卡片的相对路径为 #/app/browse', function () {
        browser.get('#/app/browse');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/app/browse');
        });
    });
    it('媒体相册的相对路径为 #/app/mediapopup', function () {
        browser.get('#/app/mediapopup');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/app/mediapopup');
        });
    });


    describe('测试简单列表列表项点击', function () {

        beforeEach(function () {
            browser.get('#/app/playlists');
            element.all(by.css('.item')).first().click();
        });


        it('测试列表数量以及过滤搜索', function () {

            var phoneList = element.all(by.repeater('phone in phones'));
            expect(phoneList.count()).toBe(20);

            //var query = element(by.model('$parent.query'));
            //query.sendKeys('nexus');
            //expect(phoneList.count()).toBe(1);
            //
            //query.clear();
            //query.sendKeys('motorola');
            //expect(phoneList.count()).toBe(8);
        });


        //it('should be possible to control phone order via the drop down select box', function() {
        //
        //  var phoneNameColumn = element.all(by.repeater('phone in phones').column('phone.name'));
        //  var query = element(by.model('query'));
        //
        //  function getNames() {
        //    return phoneNameColumn.map(function(elm) {
        //      return elm.getText();
        //    });
        //  }
        //
        //  query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter
        //
        //  expect(getNames()).toEqual([
        //    "Motorola XOOM\u2122 with Wi-Fi",
        //    "MOTOROLA XOOM\u2122"
        //  ]);
        //
        //  element(by.model('orderProp')).element(by.css('option[value="name"]')).click();
        //
        //  expect(getNames()).toEqual([
        //    "MOTOROLA XOOM\u2122",
        //    "Motorola XOOM\u2122 with Wi-Fi"
        //  ]);
        //});


        //it('测试点击一个条目，获得的链接', function() {
        //  var query = element(by.model('$parent.query'));
        //  query.sendKeys('nexus');
        //  element.all(by.css('.list-group-item-phones')).first().click();
        //  browser.getLocationAbsUrl().then(function(url) {
        //    expect(url).toBe('/app/playlists/nexus-s');
        //  });
        //});
    });


    describe('测试详情页', function () {

        beforeEach(function () {
            browser.get('#/app/playlists/nexus-s');
        });


        it('应该显示nexus-s 产品详情', function () {
            expect(element(by.binding('phone.name')).getText()).toBe('Nexus S');
        });


        it('应该显示图片', function () {
            expect(element(by.css('img')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
        });


        //it('should swap main image if a thumbnail image is clicked on', function() {
        //  element(by.css('.phone-thumbs li:nth-child(3) img')).click();
        //  expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.2.jpg/);
        //
        //  element(by.css('.phone-thumbs li:nth-child(1) img')).click();
        //  expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
        //});
    });
});
