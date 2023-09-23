export type ScoreTag = "Par" | "Bogey" | "DoubleBogey" | "TripleBogey" | "QuadrupleBogey" | "QuintupleBogey" | "SextupleBogey" | "SeptupleBogey" | "OctupleBogey" | "Birdie" | "Eagle" | "Albatross" | "HoleInOne";

export const ScoreDictionary =  {
        "Par": 0,
        "Bogey": 1,
        "DoubleBogey": 2,
        "TripleBogey": 3,
        "QuadrupleBogey": 4,
        "QuintupleBogey": 5,
        "SextupleBogey": 6,
        "SeptupleBogey": 7,
        "OctupleBogey": 8,
        "Birdie": -1,
        "Eagle": -2,
        "Albatross": -3,
        "HoleInOne": -99,
}