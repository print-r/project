import { MenuFindData } from '@/types/menu';

export type rulesType = 'required' | 'regex' | 'isNumber' | ['min' | 'max', number]

export interface ValidateOptions {
    required: (value : string | []) => boolean
    regex: (value: string, reg: RegExp) => boolean
    isNumber: (value: number) => boolean
    long: (value: string | [], num: number, type: string) => boolean
    check: (value: MenuFindData) => [] | string[]
}