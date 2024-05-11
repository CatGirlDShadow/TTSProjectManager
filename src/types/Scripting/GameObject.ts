import { Color } from "../General/Color"
import { Transform } from "../General/Transform"
import { Vector } from "../General/Vector"

export interface GameObject {
    GUID: string,
    Name: string,
    Transform: Transform,
    Nickname: string,
    Description: string,
    GMNotes: string,
    AltLookAngle: Vector,
    ColorDiffuse: Color,
    LayoutGroupSortIndex: number,
    Value: number,
    Locked: boolean,
    Grid: boolean,
    Snap: boolean,
    IgnoreFoW: boolean,
    MeasureMovement: boolean,
    DragSelectable: boolean,
    Autoraise: boolean,
    Sticky: boolean,
    Tooltip: boolean,
    GridProjection: boolean,
    HideWhenFaceDown: boolean,
    Hands: boolean,
    MaterialIndex: number,
    MeshIndex: number,
    LuaScript?: string,
    LuaScriptState?: string,
    XmlUI?: string,
    ContainedObjects?: Array<GameObject>
}