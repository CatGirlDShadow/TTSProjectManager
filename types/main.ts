export type Main = {
    SaveName: string,
    EpochTime: BigInt,
    Date: string,
    VersionNumber: string,
    GameMode: string,
    GameType: string,
    GameComplexity: string,
    PlayingTime: Array<number>,
    PlayerCounts: Array<number>,
    Tags: Array<string>,
    Note: string
};