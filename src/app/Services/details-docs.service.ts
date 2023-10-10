import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DétailDoc } from '../Model/DétailDoc';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsDocsService {
  private baseUrl="http://localhost:8081";
  
  constructor(private http:HttpClient) { }

  createDetailDoc( file:File):Observable<DétailDoc>{
    const formData:FormData=new FormData();
    formData.append('file',file);
    return this.http.post<DétailDoc>(`${this.baseUrl}/uploadFile`,formData);
  }

 
  
  downloadFile(id: Number): Observable<Blob> {
    const url = `${this.baseUrl}/download/${id}`;
    return this.http.get(url, {
      responseType: 'blob', // Spécifiez le type de réponse comme un blob
    });
  }

  //validate xml file with his xsd file
 
  validateXml(idDoc:Number):Observable<boolean>{
       return this.http.post<boolean>(`${this.baseUrl}/validate-xml/${idDoc}`,'');
  }

  //add xsd to detail doc
  addXsdToDetailDoc(idDoc:Number):Observable<DétailDoc>{
    return this.http.post<DétailDoc>(`${this.baseUrl}/addXsdFileToDetialDoc/${idDoc}`,'');
  }


}