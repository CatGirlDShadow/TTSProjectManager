import { Vector } from "@types"

export type CameraState = {
  "Position": Vector,
  "Rotation": Vector,
  "Distance": number,
  "Zoomed": boolean,
  "AbsolutePosition": Vector
} | null