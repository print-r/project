import { Vue } from 'vue-property-decorator';

export interface ReturnParams {
    code: number;
    data: any;
    msg: string;
}

export abstract class Utils extends Vue {
    protected abstract handleCheckData(): ReturnParams; // 验证、返回子组件数据
    protected abstract handleResetData(): void; // 重置子组件数据
}

