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
    roundResults: HoleResult[],
    roundTotal: number,
    roundResult: number,
    by: string,
    coursePar: number,
    courseName: string
}

export interface User {
    name: string,
    rounds: Round[],
}