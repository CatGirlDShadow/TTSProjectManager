import { Color, Vector } from "@types";

export interface VectorLineState {
    points3: Array<Vector>,
    color: Color,
    thickness: number,
    rotation?: Vector,
    loop?: boolean,
    square?: boolean
}