"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.menuData = exports.commonHeaderStyle = void 0;
// 头部公共主题样式
exports.commonHeaderStyle = {
    mobile: {
        theme: {
            1: {
                backgroundImage: 'http://cdn.dusun.com.cn/20/wx_microapp/image/bg_a_s.png',
            },
            2: {
                backgroundImage: 'http://cdn.dusun.com.cn/20/wx_microapp/image/bg_b.png',
                addedClass: 'defalutThemeStyle'
            },
            3: {
                backgroundImage: 'http://cdn.dusun.com.cn/20/wx_microapp/image/bg_c_s.png',
            },
            4: {
                backgroundImage: 'http://cdn.dusun.com.cn/20/wx_microapp/image/bg_d_s.png',
            },
            5: {
                backgroundImage: 'http://cdn.dusun.com.cn/20/wx_microapp/image/bg_g_s.png',
            },
            6: {
                backgroundImage: 'http://cdn.dusun.com.cn/20/wx_microapp/image/bg_h_s.png',
            },
            7: {
                backgroundImage: 'http://cdn.dusun.com.cn/20/wx_microapp/image/bg_e_s.png',
            },
            8: {
                backgroundImage: 'http://cdn.dusun.com.cn/20/wx_microapp/image/bg_f_s.png',
            }
        }
    },
    pc: {
        theme: {
            1: {
                shopNameColor: '#333',
                navColor: '#fff',
                backgroundColor: '#333',
                backgroundImage: ''
            },
            2: {
                shopNameColor: '#333',
                navColor: '#fff',
                backgroundColor: '#333',
                backgroundImage: require('../../../assets/images/theme/nav_a.png')
            },
            3: {
                shopNameColor: '#2b6d41',
                navColor: '#fff',
                backgroundColor: '#2b6d41',
                backgroundImage: require('../../../assets/images/theme/nav_b.png')
            },
            4: {
                shopNameColor: '#333',
                navColor: '#fff',
                backgroundColor: '#e6232b',
                backgroundImage: '#fff'
            },
            5: {
                shopNameColor: '#333',
                navColor: '#fff',
                backgroundColor: '#bd8765',
                backgroundImage: '#FFFBF2'
            },
            6: {
                shopNameColor: '#333',
                navColor: '#fff',
                backgroundColor: '#a1a7b3',
                backgroundImage: ''
            },
            7: {
                shopNameColor: '#333',
                navColor: '#fff',
                backgroundColor: '#545a57',
                backgroundImage: require('../../../assets/images/theme/nav_f.png')
            },
            8: {
                shopNameColor: '#333',
                navColor: '#333',
                backgroundColor: '#f1efee',
                backgroundImage: require('../../../assets/images/theme/nav_g.png')
            }
        }
    }
};
// 组件列表
exports.menuData = [
    {
        template: 'header',
        name: '头部',
        img: '',
        order: 1,
        fixed: true,
        show: false,
        isEdit: false,
        isDelete: false,
        max: 1,
        exist: 0,
        data: __assign({}, exports.commonHeaderStyle)
    },
    {
        template: 'slide',
        name: '轮播图模块',
        img: require('../../../assets/images/pic_lbt_.png'),
        order: 2,
        fixed: false,
        show: true,
        isEdit: true,
        isDelete: true,
        max: 3,
        exist: 0,
        utils: 'slide',
        utils_title: '轮播图设置',
        data: {
            list: [],
            validate: {
                max: 6,
                suffix: ['jpeg', 'jpg', 'png']
            }
        }
    },
    {
        template: 'product',
        name: '商品列表',
        img: '',
        order: 3,
        fixed: false,
        show: false,
        isEdit: false,
        isDelete: false,
        max: 1,
        exist: 0,
        data: {
            mobile: {
                theme: {
                    1: {
                        backgroundColor: '#fff'
                    },
                    2: {
                        backgroundColor: 'none'
                    },
                    3: {
                        backgroundColor: '#fff'
                    },
                    4: {
                        backgroundColor: '#fff'
                    },
                    5: {
                        backgroundColor: '#fff'
                    },
                    6: {
                        backgroundColor: '#fff'
                    },
                    7: {
                        backgroundColor: '#fff'
                    },
                    8: {
                        backgroundColor: '#fff'
                    }
                }
            }
        }
    },
    {
        template: 'footer',
        name: '底部',
        img: '',
        order: 4,
        fixed: true,
        show: false,
        isEdit: true,
        isDelete: false,
        max: 1,
        exist: 0,
        data: {}
    },
    {
        template: 'coupon',
        name: '优惠劵模块',
        img: require('../../../assets/images/pic_yhq.png'),
        order: 5,
        fixed: false,
        show: true,
        isEdit: true,
        isDelete: true,
        max: 1,
        utils: 'coupon',
        utils_title: '优惠券设置',
        exist: 0,
        data: {}
    },
];
