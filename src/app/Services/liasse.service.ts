import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LiasseFiscale } from '../Model/LiasseFiscale';

@Injectable({
  providedIn: 'root'
})
export class LiasseService {
  
  private baseurl="http://localhost:8081";
  constructor(private http:HttpClient) { }
 
  //get list of all liasse
  getAllLiasse():Observable<any>{
    return this.http.get(`${this.baseurl}/getAllLiasse`);
  }
  //create liasse fiscale
  createLiasse(liasse:LiasseFiscale):Observable<LiasseFiscale>{
    return this.http.post<LiasseFiscale>(`${this.baseurl}/createLiasse`,liasse);
  }

  //add liasse to list of docs

  addLiasseToDocs(idLiasse:Number,codes:Number[]):Observable<any>{
          return this.http.post(`${this.baseurl}/addLiasse/${idLiasse}`,codes);
  }

  //get liasse fiscale
  getLiassebyId(idLiasse:Number):Observable<LiasseFiscale>{
    return this.http.get<LiasseFiscale>(`${this.baseurl}/getLiasse/${idLiasse}`);
  }

  //update liasse
  updateLiasse(idLiasse:number,liasse:LiasseFiscale):Observable<LiasseFiscale>{
    return this.http.put<LiasseFiscale>(`${this.baseurl}/updateLiasse/${idLiasse}`,liasse);
  }
}
