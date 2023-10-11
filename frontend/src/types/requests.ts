export type RequestBase<TDto> = {
    signal: AbortSignal
    params: object,
    requestData: TDto | object
}

export interface RequestWithId<TDto> extends RequestBase<TDto>  {
    id: number
} 

export type StatisticsRequest = {
    id: number,
    signal: AbortSignal
}