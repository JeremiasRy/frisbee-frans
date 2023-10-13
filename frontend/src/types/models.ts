import { ScoreTag } from "../helper";
import { BaseModel } from "./base";

export interface Course extends BaseModel {
    name: string,
    cityName: string,
    address: string,
    courseGrade: string,
    holes: Hole[],
    coursePar: number,
    roundsPlayed: number
}

export interface CourseStats {
    averageScore: number,
    bestScore: number,
    roundsPlayed: number
}

export interface UserStats {
    totalHolesPlayed: number,
    averageScore: number,
    totalThrows: number,
    breakdownOfHoleResults: {
        count: number,
        identifier: ScoreTag
    }[]
}

export interface HoleStats {
    averageScore: number,
    breakdownOfHoleResults: {
        count: number,
        identifier: ScoreTag
    }[]
}

export interface Hole extends BaseModel {
    par: number,
    length: number,
    nthHole: number,
    comments: Comment[],
    courseName: string
}

export interface HoleResult extends BaseModel {
    userId: number,
    holeId: number,
    roundId: number,
    throws: number,
    nthHole: number,
    penalties: number,
    par: number,
    scoreTag: ScoreTag
}

export interface Round extends BaseModel {
    userId: number,
    courseId: number,
    course: Course,
    comments: Comment[],
    roundResults: HoleResult[],
    roundTotal: number,
    roundResult: number,
    by: string
    createdAt: Date
    status: "NotStarted" | "OnGoing" | "Completed"
}

export interface User {
    username: string,
}

export interface LoggedIn {
    token: string,
    id: number,
    loginCount: number,
    name: string
}

export type SortDirection = "ASCENDING" | "DESCENDING" | "NONE"

export interface Comment extends BaseModel {
    text: string,
    user: User
}

export interface RoundComment extends Comment {
    roundId: number
}

export interface CourseComment extends Comment {
    courseId: number
}

export interface HoleComment extends Comment {
    holeId: number
}