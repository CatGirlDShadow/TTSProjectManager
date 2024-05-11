export interface Turns {
    Enable: boolean,
    Type: number,
    TurnOrder: Array<string>,
    Reverse: boolean,
    SkipEmpty: boolean,
    DisableInteractions: boolean,
    PassTurns: boolean,
    TurnColor: string
}