import { Injectable } from '@angular/core';
import { LiasseFiscale } from '../Model/LiasseFiscale';
import { Tracabilité } from '../Model/Tracabilité';

@Injectable({
  providedIn: 'root'
})
export class PartageLiasseService {
  
  liasseFiscale:LiasseFiscale=new LiasseFiscale();
  tracabilite:Tracabilité=new Tracabilité();
  method:string='create';
  constructor() { }
}
