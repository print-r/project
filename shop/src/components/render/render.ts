import { menu, utils } from '@/components/menu';
export default {
    name: 'render',
    render(this: any, h: any): void {
        const mode = this.utils ? utils : menu;
        const name = this.utils ? this.value.utils : this.value.template;
        return h(mode[this.mode][name], {
            props: {
                value: this.value.data,
                isPreview: this.isPreview,
                production: this.production,
            },
        });
    },
    props: {
        value: {
            type: Object,
            default: {},
        },
        mode: {
            type: String,
            default: '',
        },
        utils: {
            type: Boolean,
            default: false,
        },
        isPreview: {
            type: Boolean,
            default: false,
        },
        production: {
            type: Boolean,
            default: false,
        },
    },
};