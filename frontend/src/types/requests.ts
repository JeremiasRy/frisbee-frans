export type RequestBase<TDto> = {
    signal: AbortSignal
    params: {},
    requestData: TDto | {}
}

export interface RequestWithId<TDto> extends RequestBase<TDto>  {
    id: number
} 