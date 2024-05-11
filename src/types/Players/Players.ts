
import { CameraState } from "./CameraState"
import { Hands } from "./Hands"
import { Player } from "./Player"

export interface Players {
    TabStates: Map<string, Player>,
    Hands: Hands,
    CameraStates: Array<CameraState>
}