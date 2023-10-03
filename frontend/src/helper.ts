import { RequestBase, RequestWithId } from "./types/requests";

export type CreateStep = "SelectCourse" | "CourseSelected" | "CourseCreated" | "CreateEmptyResults" | "EmptyResultsCreated" | "Done"

export type Direction = "Next" | "Previous";

export type ScoreTag = "Par" | "Bogey" | "DoubleBogey" | "TripleBogey" | "QuadrupleBogey" | "QuintupleBogey" | "SextupleBogey" | "SeptupleBogey" | "OctupleBogey" | "Birdie" | "Eagle" | "Albatross" | "HoleInOne";

export const ScoreDictionary = new Map<string, number>([
        ["Par", 0],
        ["Bogey", 1],
        ["DoubleBogey", 2],
        ["TripleBogey", 3],
        ["QuadrupleBogey", 4],
        ["QuintupleBogey", 5],
        ["SextupleBogey", 6],
        ["SeptupleBogey", 7],
        ["OctupleBogey", 8],
        ["Birdie", -1],
        ["Eagle", -2],
        ["Albatross", -3],
        ["HoleInOne", -99],
])
export function createRequest<TDto>(signal:AbortSignal):RequestBase<TDto>
export function createRequest<TDto>(signal:AbortSignal, params: {}):RequestBase<TDto>;
export function createRequest<TDto>(signal:AbortSignal, requestData: TDto):RequestBase<TDto>;
export function createRequest<TDto>(signal:AbortSignal, params: {}, requestData: TDto):RequestBase<TDto>;
export function createRequest<TDto>(signal:AbortSignal, params?: {}, requestData?: TDto | {}):RequestBase<TDto> {
        if (params === undefined) {
                params = {}
        }
        if (requestData === undefined) {
                requestData = {}
        }
        return {
                signal,
                params,
                requestData
        }
}
export function createRequestWithId<TDto>(id:number | string | undefined, signal: AbortSignal):RequestWithId<TDto>
export function createRequestWithId<TDto>(id:number | string | undefined, signal: AbortSignal, params: {}):RequestWithId<TDto>
export function createRequestWithId<TDto>(id:number | string | undefined, signal: AbortSignal, requestData: TDto):RequestWithId<TDto>
export function createRequestWithId<TDto>(id:number | string | undefined, signal: AbortSignal, params: {}, requestData: TDto):RequestWithId<TDto>
export function createRequestWithId<TDto>(id:number | string | undefined, signal: AbortSignal, params?: {}, requestData?: TDto | {}):RequestWithId<TDto> {
        if (id === undefined) {
                throw new Error("Id was undefined??")
        }

        if (typeof id === "string") {
                try {
                        id = parseInt(id as string)
                } catch {
                        throw new Error(`Can't convert ${id} to integer`)
                }
        }
        if (params === undefined) {
                params = {};
        }
        if (requestData === undefined) {
                requestData = {}
        }

        return {
                id,
                signal,
                params,
                requestData
        }
}
        


