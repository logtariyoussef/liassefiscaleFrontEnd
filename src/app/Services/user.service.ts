import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Model/User';
import { Tracabilité } from '../Model/Tracabilité';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private baseUrl="http://localhost:8081";
  constructor(private http:HttpClient) { }

  //get user by matricule

  getUserByMat(matricule:string):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/getUserByMatricule/${matricule}`);
  }

  //get list of tracabilite by user matricule
  getListTracByMatricule(matricule:string):Observable<Tracabilité[]>{
     return this.http.get<Tracabilité[]>(`${this.baseUrl}/getTracByUserMat/${matricule}`);
  }
}
