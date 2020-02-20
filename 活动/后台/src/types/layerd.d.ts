/**
 * TODO:layerd对象声明文件
 */

// loading接口参数
export interface LoadingOptions {
    content?: string; // 加载文字
    icon?: number; // loading图标
}
// 提示框接口参数
export interface AlertOptions {
    content: string; // 提示文字
    time?: number; // 停留时间
}
// 确认框接口参数
export interface ConfirmOptions {
    title?: string, // 确认框标题
    content: string, // 确认框内容
}

// layerd 属性声明
export interface LayerdOptions {
    handleToast: (params?: LoadingOptions) => void;
    handleClose: () => void;
    handleConfirm: (params: ConfirmOptions, callBack?: () => void) => void;
    handleAlert: (params?: AlertOptions) => void;
}