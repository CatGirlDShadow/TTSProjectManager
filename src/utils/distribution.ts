import { Disribution } from "../types/Distribution";

export const FieldDisribution: Disribution = {
    Main: [
        "SaveName",
        "EpochTime",
        "Date",
        "VersionNumber",
        "GameMode",
        "?GameType",
        "?GameComplexity",
        "PlayingTime",
        "PlayerCounts",
        "Tags",
        "Note",
        "?Rules"
    ],
    Board: [
        "Gravity",
        "PlayArea",
        "Table",
        "?TableURL",
        "Sky",
        "?SkyURL",
        "ComponentTags",
        "Turns",
        "?Decals",
        "DecalPallet",
        "?SnapPoints",
        "?VectorLines"
    ],
    Grid: [
        "Grid"
    ],
    Lights: [
        "Lighting"
    ],
    Music: [
        "?MusicPlayer",
    ],
    Players: [
        "TabStates",
        "Hands",
        "CameraStates",
    ]
};