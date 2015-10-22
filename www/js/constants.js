angular.module('starter')

    .constant('AUTH_EVENTS', {
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })

    .constant('USER_ROLES', {
        admin: 'admin_role',
        public: 'public_role'
    })

    /**注意这里的常量值在发布构建的时候自动被替换掉，修改该值应该在根目录下的config目录中的 发布文件*/
    .constant('APP_VERSION', {
        "eheluoAppKey": "@@eheluoAppKey",
        "eheluoVersion": "@@eheluoVersion",
        "eheluoCurrentEnv": "@@eheluoCurrentEnv"
    })

;
