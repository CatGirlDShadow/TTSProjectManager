import { ComponentTags } from "./ComponentTags"
import { Decal } from "./Decal"
import { DecalInfo } from "./DecalInfo"
import { SnapPoint } from "./SnapPoint"
import { Turns } from "./Turns"
import { VectorLineState } from "./VectorLineState"

export interface Board {
    Gravity: number,
    PlayArea: number,
    Table: string,
    TableURL: string,
    Sky: string,
    SkyURL: string,
    ComponentTags: ComponentTags,
    Turns: Turns,
    DecalPallet: Array<DecalInfo>,
    Decals?: Array<Decal>,
    SnapPoints?: Array<SnapPoint>,
    VectorLines?: Array<VectorLineState>
}