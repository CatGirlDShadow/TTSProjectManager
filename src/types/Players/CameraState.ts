import { Vector } from "../General/Vector"

export type CameraState = {
    "Position": Vector,
      "Rotation": Vector,
      "Distance": number,
      "Zoomed": boolean,
      "AbsolutePosition": Vector
} | null