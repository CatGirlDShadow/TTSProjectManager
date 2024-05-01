import { Color } from "../General/Color"
import { Vector } from "../General/Vector"

export type GridSettings = {
    Type: number,
    Lines: boolean,
    Color: Color,
    Opacity: number,
    ThickLines: boolean,
    Snapping: boolean,
    Offset: boolean,
    BothSnapping: boolean,
    xSize: number,
    ySize: number,
    PosOffset: Vector
}
export type Grid = {
    Grid: GridSettings
}