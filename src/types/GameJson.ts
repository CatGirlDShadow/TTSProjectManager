import { Board } from "./Board";
import { LooseObject } from "./General";
import { Grid } from "./Grid";
import { Lights } from "./Lights";
import { Main } from "./main";
import { Music } from "./Music";
import { Players } from "./Players";
import { Scripts, ObjectStates } from "./Scripting";

export interface GameJson extends LooseObject, Main, Grid, Players, Music, Lights, Board, Scripts, ObjectStates{
    
}