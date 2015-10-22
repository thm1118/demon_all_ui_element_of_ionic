angular.module('starter.services', ['ionic', 'ngResource'])
/** 出于演示方便，所有factory,service 都放在了一起，实际产品 通常是分开各个文件*/
    .factory('Chats', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: '你还按自己的习惯做事吗?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: '你好',
            face: 'img/max.jpg'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: '我打算买个游艇',
            face: 'img/adam.jpeg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: '看看我的微博!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: '太棒了.',
            face: 'img/mike.png'
        }, {
            id: 5,
            name: 'Ben Sparrow',
            lastText: '你还按自己的习惯做事吗?',
            face: 'img/ben.png'
        }, {
            id: 6,
            name: 'Max Lynx',
            lastText: '你好',
            face: 'img/max.jpg'
        }, {
            id: 7,
            name: 'Adam Bradleyson',
            lastText: '我打算买个游艇',
            face: 'img/adam.jpeg'
        }, {
            id: 8,
            name: 'Perry Governor',
            lastText: '看看我的微博!',
            face: 'img/perry.png'
        }, {
            id: 9,
            name: 'Mike Harrington',
            lastText: '太棒了.',
            face: 'img/mike.png'
        }, {
            id: 10,
            name: 'Ben Sparrow',
            lastText: '你还按自己的习惯做事吗?',
            face: 'img/ben.png'
        }, {
            id: 11,
            name: 'Max Lynx',
            lastText: '你好',
            face: 'img/max.jpg'
        }, {
            id: 12,
            name: 'Adam Bradleyson',
            lastText: '我打算买个游艇',
            face: 'img/adam.jpeg'
        }, {
            id: 13,
            name: 'Perry Governor',
            lastText: '看看我的微博!',
            face: 'img/perry.png'
        }, {
            id: 14,
            name: 'Mike Harrington',
            lastText: '太棒了.',
            face: 'img/mike.png'
        }];

        return {
            all: function () {
                return chats;
            },
            allnew: function (index) {
                var data = [],
                    _o = {},
                    count = index + 10;
                var i = index
                for (i; i < count; i++) {
                    _o = {
                        // http://stackoverflow.com/a/8084248/1015046
                        id: i,
                        name: 'Mike Harrington',
                        lastText: '太棒了.',
                        face: 'img/mike.png'
                    };

                    data.push(_o);
                }
                return data;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })


    .factory('DataFactory', function ($timeout, $q) {

        return {
            getData: function (count) {
                /* Spoof a network call using promises*/
                var deferred = $q.defer();

                var data = [],
                    _o = {},
                    count = count || 3;

                for (var i = 0; i < count; i++) {
                    _o = {
                        // http://stackoverflow.com/a/8084248/1015046
                        random: (Math.random() + 1).toString(36).substring(7),
                        time: (new Date()).toString().substring(15, 24),
                        id: i + 1,
                        title: (Math.random() + 1).toString(36).substring(7)
                    };

                    data.push(_o);
                }

                $timeout(function () {
                    // success response!
                    deferred.resolve(data);
                }, 1000);

                return deferred.promise;
            }
        };
    })

    .factory('AjaxChartDataFactory', function ($timeout, $q) {
        var xZero = 2000;
        return {
            getData: function (count) {
                /* Spoof a network call using promises*/
                var deferred = $q.defer();

                var datapoints = [],
                    _o = {},
                    count = count || 10;

                for (var i = 0; i < count; i++) {
                    _o = {
                        // http://stackoverflow.com/a/8084248/1015046
                        y: Math.round(Math.random() * 1000),
                        x: xZero++
                    };

                    datapoints.push(_o);
                }

                $timeout(function () {
                    // success response!
                    deferred.resolve(datapoints);
                }, 1000);

                return deferred.promise;
            }
        };
    })
    .factory('PersonService', function ($http) {
        var BASE_URL = "http://api.randomuser.me/";
        var items = [];

        return {
            GetFeed: function () {
                return $http.get(BASE_URL + '?results=30').then(function (response) {
                    items = response.data.results;
                    return items;
                });
            }
        }
    })

    .service('AuthService', function ($q, $http, USER_ROLES) {
        var LOCAL_TOKEN_KEY = 'yourTokenKey';
        var username = '';
        var isAuthenticated = false;
        var role = '';
        var authToken;

        function loadUserCredentials() {
            var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            if (token) {
                useCredentials(token);
            }
        }

        function storeUserCredentials(token) {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
            useCredentials(token);
        }

        function useCredentials(token) {
            username = token.split('.')[0];
            isAuthenticated = true;
            authToken = token;

            if (username == 'admin') {
                role = USER_ROLES.admin
            }
            if (username == 'user') {
                role = USER_ROLES.public
            }

            /**这里对所有 http请求 的头 放置 验证凭据*/
            $http.defaults.headers.common['X-Auth-Token'] = token;
        }

        function destroyUserCredentials() {
            authToken = undefined;
            username = '';
            isAuthenticated = false;
            /** 清除 http头的默认凭据*/
            $http.defaults.headers.common['X-Auth-Token'] = undefined;
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        }

        var login = function (name, pw) {
            return $q(function (resolve, reject) {
                if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
                    // Make a request and receive your auth token from your server
                    storeUserCredentials(name + '.yourServerToken');
                    resolve('登录成功');
                } else {
                    reject('登录失败');
                }
            });
        };

        var logout = function () {
            destroyUserCredentials();
        };

        var isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
        };

        loadUserCredentials();

        return {
            login: login,
            logout: logout,
            isAuthorized: isAuthorized,
            isAuthenticated: function () {
                return isAuthenticated;
            },
            username: function () {
                return username;
            },
            role: function () {
                return role;
            }
        };
    })

    .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
        /**这是 http请求 统一拦截器，可以全局统一处理 正常请求，请求错误，正常响应，响应错误
         * 可以用来 统一控制权限；记录日志，替换请求地址，设置请求头, 对返回的数据统一预加工等等
         * */
        return {
            // optional method
            'request': function (config) {
                // 成功发出请求时的统一处理:可以修改config，或创建一个新的config
                //console.debug('成功request', config);
                $rootScope.$broadcast('loading:show');
                return config;
            },

            // optional method
            'requestError': function (rejection) {
                // 请求错误时的统一处理
                if (canRecover(rejection)) {
                    return responseOrNewPromise
                }
                return $q.reject(rejection);
            },
            // optional method
            'response': function (response) {
                // 响应成功时的统一处理，可以修改response
                $rootScope.$broadcast('loading:hide');
                return response;
            },
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized
                }[response.status], response);
                return $q.reject(response);
            }
        };
    })

    .factory('PhoneService', ['$resource',
        function($resource){
            return $resource('phones/:phoneId.json', {}, {
                query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
            });
        }])

    .factory('crisisServiceFactory', function ($rootScope, $http) {
        return {
            getcrisisList: function () {
                return   $http.get('phones/crisisList.json');
            }
        };
    })
;
