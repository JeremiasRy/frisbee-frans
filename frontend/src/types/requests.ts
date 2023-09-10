export type Base = {
    signal: AbortSignal
    params: {},
    requestData: {}
}

export interface RequestWithId extends Base  {
    id: number
} 