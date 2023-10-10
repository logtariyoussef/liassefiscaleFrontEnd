import { Tracabilité } from "./Tracabilité";

export class User{
    matriculeFiscale!:string;
    nom!:string;
    prénom!:string;
    email!:string;
    raisonSocial!:string;
    Adresse!:string;
    motdePasse!:string;
    tracabilites!:Tracabilité[];
}