import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
   private baseUrl="http://localhost:8081";
  constructor(private http:HttpClient) { }

 
  //create document
  createDoc(doc:Document):Observable<Document>{
   return this.http.post<Document>(`${this.baseUrl}/createDoc`,doc);
  }


  //add the file to the doc
  addFileToDoc(idDoc:number,idFile:number){
       return this.http.post(`${this.baseUrl}/Doc/${idDoc}/ToDetail/${idFile}`,'');
  }
  //get all documents

  getAllDocs():Observable<any>{
    return this.http.get(`${this.baseUrl}/getAllDocs`);
  }

  //add document to categorie
  addDocToCate(idDoc:number,idCat:number){
    return this.http.post(`${this.baseUrl}/add/${idDoc}/${idCat}`,'');
  }

  //
  getListDocsByIdLiasse(idLiasse:number):Observable<Document[]>{
    return this.http.get<Document[]>(`${this.baseUrl}/getListDocs/${idLiasse}`);
  }
}
