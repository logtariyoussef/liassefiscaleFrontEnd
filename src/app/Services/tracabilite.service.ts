import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tracabilité } from '../Model/Tracabilité';

@Injectable({
  providedIn: 'root'
})
export class TracabiliteService {
  private baseUrl="http://localhost:8081";
  constructor(private http:HttpClient) { }

  saveTracabilite(trac:Tracabilité):Observable<Tracabilité>{
       return this.http.post<Tracabilité>(`${this.baseUrl}/createTrac`,trac);
  }

  addUserAndLiasseTotrac(matricule:string,idTrac:Number,idLiasse:Number):Observable<Tracabilité>{
   return this.http.post<Tracabilité>(`${this.baseUrl}/addtrac/${matricule}/${idTrac}/${idLiasse}`,'');
  }

  //update trace

  updateTracabilite(id:number,trace:Tracabilité):Observable<Tracabilité>{
      return this.http.put<Tracabilité>(`${this.baseUrl}/updateTrac/${id}`,trace);
  }

  //
  getListTracByUserMat(mat:string):Observable<any>{
     return this.http.get(`${this.baseUrl}/getTracByUserMat/${mat}`);
  }
}
