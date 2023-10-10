import { Catégorie } from "./Catégorie";
import { DétailDoc } from "./DétailDoc";
import { LiasseFiscale } from "./LiasseFiscale";

export class Document{
    id!:number;
    code!:string;
    libelle!:string;
    natureDoc!:string;
    formatDoc!:string;
    liasseFiscale!:LiasseFiscale;
    detailDoc!:DétailDoc;
    categorie!:Catégorie;
    
}