import { Board, Grid, Lights, LooseObject, Main, Music, ObjectStates, Players, Scripts } from "@types";

export interface GameJson extends LooseObject, Main, Grid, Players, Music, Lights, Board, Scripts, ObjectStates {

}