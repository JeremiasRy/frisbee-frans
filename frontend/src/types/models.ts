import { ScoreTag } from "../helper";
import { BaseModel } from "./base";

export interface Course extends BaseModel {
    name: string,
    holes: Hole[],
    coursePar: number
}

export interface Hole extends BaseModel {
    par: number,
    length: number,
    nthHole: number,
    courseId: number
}

export interface HoleResult extends BaseModel {
    userId: number,
    holeId: number,
    roundId: number,
    throws: number,
    nthHole: number,
    penalties: number,
    scoreTag: ScoreTag
}

export interface Round extends BaseModel {
    userId: number,
    courseId: number,
    course: Course,
    roundResults: HoleResult[],
    roundTotal: number,
    roundResult: number,
    by: string
    createdAt: Date
}

export interface User {
    name: string,
    rounds: Round[],
}

export interface LoggedIn {
    token:string,
    id:number
}