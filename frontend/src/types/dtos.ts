export type CourseDto = {
    name: string
};

export type HoleResultDto = {
    userId: number,
    roundId: number,
    holeId: number,
    throws: number,
    penalties: number,
}

export type RoundDto = {
    userId: number,
    courseId: number,
}

export type HoleDto = {
    par: number,
    length: number,
    nthHole: number,
    courseId: number
}

export type LoginDto = {
    name: string,
    password: string
}