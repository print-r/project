"use strict";
exports.__esModule = true;
var menu_1 = require("@/components/menu");
exports["default"] = {
    name: 'render',
    render: function (h) {
        var mode = this.utils ? menu_1.utils : menu_1.menu;
        var name = this.utils ? this.value.utils : this.value.template;
        return h(mode[this.mode][name], {
            props: {
                value: this.value.data,
                isPreview: this.isPreview,
                production: this.production,
                searchWord: this.searchWord,
            }
        });
    },
    props: {
        value: {
            type: Object,
            "default": {}
        },
        mode: {
            type: String,
            "default": ''
        },
        utils: {
            type: Boolean,
            "default": false
        },
        isPreview: {
            type: Boolean,
            "default": false
        },
        production: {
            type: Boolean,
            "default": false
        },
        searchWord: {
            type: String,
            default: '',
        },
    }
};
