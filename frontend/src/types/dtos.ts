export type CourseDto = {
    name: string
};

export type HoleResultDto = {
    userId: number,
    courseId: number,
    holeId: number,
    throws: number,
    penalties: number,
}

export type RoundDto = {
    userId: number,
    courseId: number,
}