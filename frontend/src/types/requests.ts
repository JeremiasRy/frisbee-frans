export type Base = {
    signal: AbortSignal
    params: {}
}

export interface WithId extends Base  {
    id: number
} 