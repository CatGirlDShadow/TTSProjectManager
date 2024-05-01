import { Board } from "./Board";
import { Grid } from "./Grid";
import { Lights } from "./Lights";
import { Main } from "./main";
import { Music } from "./Music";
import { Players } from "./Players";
import { GlobalScripts, ObjectStates } from "./Scripting";

export type GameJson = Main & Grid & Players & Music & Lights & Board & GlobalScripts & ObjectStates;