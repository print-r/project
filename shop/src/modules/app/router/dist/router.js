"use strict";
exports.__esModule = true;
var _import_1 = require("./_import");
var routeList = [
    {
        path: '/',
        redirect: '/mobile'
    },
    {
        path: '/mobile',
        name: 'Mobile',
        component: function () { return _import_1["default"]('mobile/index'); },
        meta: {
            title: '大尚国际 - 商家店铺 - 移动端',
            keepAlive: true
        }
    },
    {
        path: '/pc',
        name: 'PC',
        component: function () { return _import_1["default"]('pc/index'); },
        meta: {
            title: '大尚国际 - 商家店铺 - PC端',
            keepAlive: false
        }
    },
    {
        path: '/cate',
        name: 'Cate',
        component: function () { return _import_1["default"]('cate/index'); },
        meta: {
            title: '大尚国际 - 商家店铺 - 分类',
            keepAlive: true
        }
    },
    {
        path: '/search',
        name: 'Search',
        component: function () { return _import_1["default"]('search/index'); },
        meta: {
            title: '大尚国际 - 商家店铺 - 搜索',
            keepAlive: true
        }
    },
];
exports["default"] = routeList;
