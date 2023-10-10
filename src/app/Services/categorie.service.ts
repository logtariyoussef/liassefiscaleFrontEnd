import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catégorie } from '../Model/Catégorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
 private baseUrl="http://localhost:8081";
  constructor(private http:HttpClient) { }

  //get list of categorie
  getListCategorie():Observable<any>{
   return this.http.get(`${this.baseUrl}/getAllCat`);
  }

  //get categorie by id
  getCategorieById(id:Number):Observable<Catégorie>{
         return this.http.get<Catégorie>(`${this.baseUrl}/get/${id}`);
  }
}
