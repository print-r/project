
export interface DataOptions {
    container: string[]
}
export interface ThemeOption {
    title: string
    img: any
    background?: string
    show: boolean
    data: DataOptions
    [key: string]: any
}

export interface ThemeOptions {
    [key: string]: ThemeOption
}