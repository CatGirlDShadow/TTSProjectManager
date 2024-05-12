
import { CameraState, Hands, Player } from "@types"

export interface Players {
    TabStates: Map<string, Player>,
    Hands: Hands,
    CameraStates: Array<CameraState>
}