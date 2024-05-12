import { ComponentTags, Decal, DecalInfo, SnapPoint, Turns, VectorLineState } from "@types"

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