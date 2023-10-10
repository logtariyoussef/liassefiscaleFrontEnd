import { LiasseFiscale } from "./LiasseFiscale";
import { User } from "./User";

export class Tracabilité{
    id!:number;
    dateDepot!:string;
    natureDepot!:string;
    user!:User;
    liassefiscale!:LiasseFiscale;

}