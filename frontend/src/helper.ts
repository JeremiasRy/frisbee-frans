import { RequestBase, RequestWithId } from "./types/requests";

export type CreateStep = "SelectCourse" | "CourseSelected" | "CourseCreated" | "CreateEmptyResults" | "EmptyResultsCreated" | "Done"

export type Direction = "Next" | "Previous";

export type ScoreTag = "Par" | "Bogey" | "DoubleBogey" | "TripleBogey" | "QuadrupleBogey" | "QuintupleBogey" | "SextupleBogey" | "SeptupleBogey" | "OctupleBogey" | "Birdie" | "Eagle" | "Albatross" | "HoleInOne";

export const Grades = [
        "NoGrade",
        "d3",
        "d2",
        "d1",
        "c3",
        "c2",
        "c1",
        "b3",
        "b2",
        "b1",
        "bb1",
        "bb2",
        "bb3",
        "a3",
        "a2",
        "a1",
        "aa3",
        "aa2",
        "aa1",
        "aaa1",
    ]

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

export function getTagByValue(number:number) {
        for (const [key, value] of ScoreDictionary.entries()) {
                if (value === number) {
                        return key
                }
        }
}
export function createRequest<TDto>(signal:AbortSignal):RequestBase<TDto>
export function createRequest<TDto>(signal:AbortSignal, params: object):RequestBase<TDto>;
export function createRequest<TDto>(signal:AbortSignal, requestData: TDto):RequestBase<TDto>;
export function createRequest<TDto>(signal:AbortSignal, params: object, requestData: TDto):RequestBase<TDto>;
export function createRequest<TDto>(signal:AbortSignal, params?: object, requestData?: TDto | object):RequestBase<TDto> {
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
export function createRequestWithId<TDto>(id:number | string | undefined, signal: AbortSignal, params: object):RequestWithId<TDto>
export function createRequestWithId<TDto>(id:number | string | undefined, signal: AbortSignal, requestData: TDto):RequestWithId<TDto>
export function createRequestWithId<TDto>(id:number | string | undefined, signal: AbortSignal, params: object, requestData: TDto):RequestWithId<TDto>
export function createRequestWithId<TDto>(id:number | string | undefined, signal: AbortSignal, params?: object, requestData?: TDto | object):RequestWithId<TDto> {
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
export const color = (score: number) => {
        if (score === 0) {
                return "white"
        } else if (score > 0) {
                return `rgba(200,0,0, ${0.2 * score})`
        } else {
                return `rgba(0,200,0, ${0.2 * Math.abs(score)})`
        }
}