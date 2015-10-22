'use strict';

describe('测试PlaylistsCtrl', function() {

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
    //beforeEach(module('starter.services'));

    /**嵌套使用一个describe，这样可以再定义内部的beforeEach
     * 测试思路：
     *      1、预定义http请求的返回数据，一个包含两个手机对象的数组
     *      2、初始化需要测试的控制器，传入一个scope
     *      3、测试这个scope的数据是否符合我们期望：
     *          a、http请求前，初始值情况，应该是空数组
     *          b、http请求后，值情况
     * */
    describe('测试图文列表', function(){
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/phones.json').
                respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

            scope = $rootScope.$new();
            ctrl = $controller('PlaylistsCtrl', {$scope: scope});
        }));


        it('xhr请求后，应该返回包括两个手机对象的数组', function() {
            expect(scope.phones).toEqualData([]);
            $httpBackend.flush();
            //expect(angular.equals(scope.phones, [{name: 'Nexus S'}, {name: 'Motorola DROID'}])).toBeTruthy();
            expect(scope.phones).toEqualData(
                [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
        });

    });

});

