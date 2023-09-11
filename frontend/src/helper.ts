export type ScoreTag = "Par" | "Bogey" | "DoubleBogey" | "TripleBogey" | "QuadrupleBogey" | "QuintupleBogey" | "SextupleBogey" | "SeptupleBogey" | "OctupleBogey" | "Birdie" | "Eagle" | "Albatross" | "HoleInOne";

export function GetScoreFromTag(tag:ScoreTag):number {
    switch (tag) {
        case "Par": return 0;
        case "Bogey": return 1;
        case "DoubleBogey": return 2;
        case "TripleBogey": return 3;
        case "QuadrupleBogey": return 4;
        case "QuintupleBogey": return 5;
        case "SextupleBogey": return 6;
        case "SeptupleBogey": return 7;
        case "OctupleBogey": return 8;
        case "Birdie": return -1;
        case "Eagle": return -2;
        case "Albatross": return -3;
        case "HoleInOne": return -99;
    }
}