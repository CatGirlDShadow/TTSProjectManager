import { Color } from "@types"

export interface Lighting {
    LightIntensity: number,
    LightColor: Color,
    AmbientIntensity: number,
    AmbientType: number,
    AmbientSkyColor: Color,
    AmbientEquatorColor: Color,
    AmbientGroundColor: Color,
    ReflectionIntensity: number,
    LutIndex: number,
    LutContribution: number
}
