'use strict';

describe('浏览详情页测试', function() {

   /**添加自定义测试匹配器,注意这里因为karma版本问题无法增加，先留着备用
     在main_controller.spec.js中，按新版本要求添加了自定义测试匹配器
     */
    //beforeEach(function(){
    //    this.addMatchers({
    //        toEqualData: function(expected) {
    //            return angular.equals(this.actual, expected);
    //        }
    //    });
    //});
    /**自定义适配器*/
    var customMatcher = {
        toEqualData: function(util, customEqualityTesters) {
            return {
                compare: function(actual, expected) {
                    if (expected === undefined) {
                        expected = '';
                    }
                    var result = {};
                    /**比较两个对象，或者两个值 是否相等。支持值类型、正则表达式，数组 和对象的比较*/
                    result.pass = angular.equals(actual, expected);
                    if (result.pass) {
                        result.message = "测试成功";
                    }else{
                        result.message = "对象比较失败";
                    }
                    return result;
                }
            };
        }
    };

    /**添加自定义测试匹配器,注意这里因为karma版本问题无法增加，先留着备用*/
    beforeEach(function(){
        jasmine.addMatchers(customMatcher);
    });

    /**每个测试前都需要加载的模块*/
    beforeEach(module('starter.controllers'));
    beforeEach(module('starter.services'));


    /**嵌套使用一个describe，这样可以再定义内部的beforeEach
     * 测试思路：
     *      1、预定义http请求的返回数据
     *      2、初始化需要测试的控制器，传入一个scope
     *      3、测试这个scope的数据是否符合我们期望：
     *          a、http请求前，初始值情况
     *          b、http请求后，值情况
     * */
    describe('详情页控制器', function(){
        var scope, $httpBackend, ctrl,
            /**定义模拟数据*/
            xyzPhoneData = function() {
                return {
                    name: 'phone xyz',
                    images: ['image/url1.png', 'image/url2.png']
                }
            };

        /**这里使用了inject函数，用来注入Angular已定义服务*/
        beforeEach(inject(function(_$httpBackend_, $rootScope, $stateParams, $controller) {
            /**_$httpBackend_ 服务，模拟http请求测试*/
            $httpBackend = _$httpBackend_;
            /**预定义该请求应返回的模拟数据*/
            $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

            /**定义路由服务的参数*/
            $stateParams.playlistId = 'xyz';
            /**新建一个scope*/
            scope = $rootScope.$new();

            /**新建一个 控制器，这就是我们需要测试的控制器*/
            ctrl = $controller('PlaylistCtrl', {$scope: scope});
        }));


        it('应该获得一个phone对象', function() {
            /**http请求前*/
            expect(scope.phone).toEqualData({});
            /**模拟http请求*/
            $httpBackend.flush();
            /**http请求后*/
            //expect(scope.phone).toEqualData(xyzPhoneData());
            expect(scope.phone).toEqualData(xyzPhoneData());
        });
    });
});

