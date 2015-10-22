(function () {
    var app = angular.module('starter',
        ['ionic','ngIOS9UIWebViewPatch','ionicLazyLoad', 'ngMockE2E', 'ionic-datepicker', 'jett.ionic.filter.bar', 'ionic.contrib.frostedGlass', 'ion-autocomplete',
            'ionic.ion.autoListDivider','ionic.contrib.ui.hscrollcards','ion-gallery','monospaced.qrcode',
            'angular-echarts', 'chart.js', 'starter.controllers', 'starter.services']);

    app.run(function ($ionicPlatform, $rootScope, $ionicLoading) {
        $ionicPlatform.ready(function () {
            if($ionicPlatform.is('android')) {
                console.log('毛玻璃效果只支持 iOS 或 Android 4.4 以上!');
            }
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $rootScope.$on('loading:show', function() {
            $ionicLoading.show({templateUrl:'templates/loading.html'})
        });

        $rootScope.$on('loading:hide', function() {
            $ionicLoading.hide()
        });

        // // View Life Cycle on root scope

        $rootScope.$on('$ionicView.loaded', function(event, view) {
            console.log('Loaded..', view.stateName);
        });

        $rootScope.$on('$ionicView.beforeEnter', function(event, view) {
            /** 这里演示 在一个tab页 隐藏tab 栏*/
            $rootScope.isHideTabBar = (view.stateName === 'app.tabs.chat-detail');
            console.log('$rootScope.isHideTabBar 的值是', $rootScope.isHideTabBar);
            console.log('Before Enter..', view.stateName);
        });

        $rootScope.$on('$ionicView.afterEnter', function(event, view) {
            console.log('After Enter..', view.stateName);
        });

        $rootScope.$on('$ionicView.enter', function(event, view) {
            console.log('Entered..', view.stateName);
        });

        $rootScope.$on('$ionicView.leave', function(event, view) {
            console.log('Left..', view.stateName);
        });


        $rootScope.$on('$ionicView.beforeLeave', function(event, view) {
            console.log('Before Leave..', view.stateName);
        });


        $rootScope.$on('$ionicView.afterLeave', function(event, view) {
            console.log('After Leave..', view.stateName);
        });

        $rootScope.$on('$ionicView.unloaded', function(event, view) {
            console.log('View unloaded..', view.stateName);
        });
    })

        .run(function ($httpBackend) {
            /** 这里临时放置了一些单元测试用的http服务模拟提供，
             todo: 这里会拦截所有http请求，注意产品开发需要移除*/
            $httpBackend.whenGET('http://localhost:8100/valid')
                .respond({message: '这是模拟有效响应!'});
            $httpBackend.whenGET('http://localhost:8100/notauthenticated')
                .respond(401, {message: "这是模拟验证未通过"});
            $httpBackend.whenGET('http://localhost:8100/notauthorized')
                .respond(403, {message: "这是模拟未验证"});

            $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
            $httpBackend.whenGET(/phones\/\w+.*/).passThrough();
            $httpBackend.whenGET('http://api.randomuser.me/?results=30').passThrough();
            $httpBackend.whenHEAD('http://api.randomuser.me/?results=30').passThrough();

        })

        .config(function ($httpProvider, $ionicFilterBarConfigProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
            $ionicFilterBarConfigProvider.placeholder('搜索');
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state('app', {
                    url: "/app",
                    abstract: true,
                    templateUrl: "templates/menu.html",
                    controller: 'AppCtrl'
                })
                .state('app.tabs', {
                    url: "/tabs",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/tabs.html"
                        }
                    }
                })

                .state('app.url_qrcode', {
                    url: "/url_qrcode",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/url_qrcode.html",
                            controller: 'UrlQrcodeCtrl'
                        }
                    }
                })

                .state('app.echart', {
                    url: "/echart",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/echart.html",
                            controller: 'EchartCtrl'
                        }
                    }
                })
                .state('app.chartjs', {
                    url: "/chartjs",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/chartjs.html",
                            controller: 'ChartjsCtrl'
                        }
                    }
                })

                .state('app.search', {
                    url: "/search",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/search.html",
                            controller: 'SearchCtrl'
                        }
                    }
                })

                .state('app.browse', {
                    url: "/browse",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/browse.html"
                        }
                    }
                })
                .state('app.playlists', {
                    url: "/playlists",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/playlists.html",
                            controller: 'PlaylistsCtrl'
                        }
                    }
                })

                .state('app.single', {
                    url: "/playlists/:playlistId",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/playlist.html",
                            controller: 'PlaylistCtrl'
                        }
                    }
                })
                .state('app.tabs.dash', {
                    url: '/dash',
                    views: {
                        'tab-dash': {
                            templateUrl: 'templates/tab-dash.html',
                            controller: 'DashCtrl'
                        }
                    }
                })
                .state('app.tabs.chats', {
                    url: '/chats',
                    views: {
                        'tab-chats': {
                            templateUrl: 'templates/tab-chats.html',
                            controller: 'ChatsCtrl'
                        }
                    }
                })
                .state('app.tabs.chat-detail', {
                    url: '/chats/:chatId',
                    views: {
                        'tab-chats': {
                            templateUrl: 'templates/chat-detail.html',
                            controller: 'ChatDetailCtrl'
                        }
                    }
                })

                .state('app.tabs.account', {
                    url: '/account',
                    views: {
                        'tab-account': {
                            templateUrl: 'templates/tab-account.html',
                            controller: 'AccountCtrl'
                        }
                    }
                })
                .state('app.layout', {
                    url: '/layout',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/layout.html'
                        }
                    }
                })
                .state('app.formelements', {
                    url: '/formelements',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/formelements.html',
                            controller: 'RateCtrl'
                        }
                    }
                })
                .state('view1', {
                    url: '/view1',
                        template: '<div class="padding"><h2>视图 1</h2><button class="button button-positive" ui-sref="view2">切换到第二个视图</button></div>'

                })
                .state('view2', {
                    url: '/view2',
                        template: '<div class="padding"><h2>视图 2</h2><button class="button button-assertive" ui-sref="view1">返回到第一个视图</button>' +
                        '<button class="button button-balanced" ui-sref="app.listrefresh">返回到主页</button>' +
                        '</div>'
                })
                .state('app.slidebox', {
                    url: '/slidebox',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/slidebox.html',
                            controller: 'SlideCtrl'
                        }
                    }
                })
                .state('app.listrefresh', {
                    url: '/listrefresh',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/listrefresh.html',
                            controller: 'ListRefreshCtrl'
                        }
                    }
                })

                .state('app.actionsheet', {
                    url: '/actionsheet',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/actionsheet.html',
                            controller: 'ActionSheet'
                        }
                    }
                })
                .state('app.listoption', {
                    url: '/listoption',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/listoption.html',
                            controller: 'ListOption'
                        }
                    }
                })
                .state('app.gesture', {
                    url: '/gesture',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/gesture.html',
                            controller: 'Gesture'
                        }
                    }
                })
                .state('message', {
                    url: '/message',
                    templateUrl: 'templates/message.html',
                    controller: 'MessageCtrl'
                })
                .state('app.autocomplete', {
                    url: '/autocomplete',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/autocomplete.html',
                            controller: 'IonAutocompleteController'
                        }
                    }
                })
                .state('app.autodivider', {
                    url: '/autodivider',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/autodivider.html',
                            controller: 'AutoDividerCtrl'
                        }
                    }
                })
                .state('app.hscroll', {
                    url: '/hscroll',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/hscroll.html',
                            controller: 'HScrollCtrl'
                        }}
                })
                .state('app.gallery', {
                    url: '/gallery',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/gallery.html',
                            controller: 'GalleryCtrl'
                        }}
                })
                .state('app.hvscroll', {
                    url: '/hvscroll',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/h-vscroll.html',
                            controller: 'HScrollCtrl'
                        }}
                })
                .state('app.mediapopup', {
                    url: '/mediapopup',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/mediapopup.html',
                            controller: 'MediaCtrl'
                        }}
                })
                .state('app.authtest', {
                    url: '/authtest',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/auth.html',
                            controller: 'AuthTestCtrl'
                        }}
                })

                .state('app.datepicker', {
                    url: '/datepicker',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/datepicker.html',
                            controller: 'DatePickerCtrl'
                        }}
                })
            ;


            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/url_qrcode');
        });

}());
