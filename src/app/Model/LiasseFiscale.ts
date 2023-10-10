
import { Document } from "./Document";

export class LiasseFiscale{
    id!:number;
    exercice!:Number;
    nature!:string;
    typeDepot!:string;
    documents!:Document[];
}