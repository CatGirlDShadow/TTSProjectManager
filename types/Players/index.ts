import { CameraState } from "./CameraState"
import { Hands } from "./Hands"
import { Player } from "./Player"

export type Players = {
    TabStates: Map<string, Player>,
    Hands: Hands,
    CameraStates: Array<CameraState>
}