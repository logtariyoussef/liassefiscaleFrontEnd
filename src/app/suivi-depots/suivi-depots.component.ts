import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/User';
import { TracabiliteService } from '../Services/tracabilite.service';
import { UserService } from '../Services/user.service';
import { LiasseFiscale } from '../Model/LiasseFiscale';
import { DétailDoc } from '../Model/DétailDoc';
import { DocumentsService } from '../Services/documents.service';
import { Catégorie } from '../Model/Catégorie';
import { DetailsDocsService } from '../Services/details-docs.service';
import { HttpResponse } from '@angular/common/http';
import { Tracabilité } from '../Model/Tracabilité';
import { LiasseService } from '../Services/liasse.service';
import { PartageLiasseService } from '../Services/partage-liasse.service';

@Component({
  selector: 'app-suivi-depots',
  templateUrl: './suivi-depots.component.html',
  styleUrls: ['./suivi-depots.component.css']
})
export class SuiviDepotsComponent implements OnInit {
 
  user=new User();
  document=new Document();
  index!:number;
  liassefiscaleInfo=new LiasseFiscale();
  nombreDocs!:number;
  date!:string;
  detailDepo:Boolean=false;
  detailDoc:Boolean=false;
  fileDoc=new DétailDoc();
  extension:string[]=[];
  listTracabilite:Tracabilité[]=[];
  documents:any;
  depotNature:string='';
  idLiasse!:Number;
  depotDate:string='';
  showPopupUpdate=false;
  years:number[]=[2010,2011,2012,2013,2014,2015,2016,2017,2018];
  liasseUpdated=new LiasseFiscale();
  tracabiliteUpdate=new Tracabilité();
  localDate:Date=new Date();
 
 
  
  constructor(private route:Router,private userService:UserService,private detailDocFile:DetailsDocsService,private tracabiliteService:TracabiliteService,private docService:DocumentsService,
    private liasseService:LiasseService,private partageLiasse:PartageLiasseService
    ){
   
  }
  ngOnInit(): void {
    //localStorage.getItem("userExist");
    this.user=JSON.parse(localStorage.getItem("userExist")||'{}');
    
    this.getUserByMatricule();


    //this.getListTracByMatricule();
   // this.getAllDocs();

  }
  
  closePopup(){
    this.showPopupUpdate=false;
  }
 
  ModifierLiasse(i:number){
    this.index=i;
    //this.showPopupUpdate=true;
    this.route.navigate(['/depotLiasse']);
    this.liasseUpdated=this.user.tracabilites[this.index].liassefiscale;
    this.partageLiasse.liasseFiscale=this.liasseUpdated;
    this.partageLiasse.method='update';
    this.tracabiliteUpdate=this.user.tracabilites[this.index];
    this.partageLiasse.tracabilite=this.tracabiliteUpdate;
    
   

   
  }

  updateLiasse(){
   
    this.liasseService.updateLiasse(this.liasseUpdated.id,this.liasseUpdated).subscribe((res)=>{
      console.log(res);
    })
    
    this.showPopupUpdate=false;
   
    
  }

  


//get list tracabalite of user
getListTracByMatricule(){
  return this.userService.getListTracByMatricule(this.user.matriculeFiscale).subscribe((res)=>{
    this.listTracabilite=res;
    console.log(this.listTracabilite);
  },error=>{
    console.log(error);
  })
}


  
  getUserByMatricule(){
    return this.userService.getUserByMat(this.user.matriculeFiscale).subscribe((res)=>{
      this.user=res;
      for(let trac of this.user.tracabilites){
        this.depotDate=trac.dateDepot;
       // console.log(this.depotDate);
      }
      console.log(this.user);
     
     
    })
  }
  afficherDetails(i:number){
    this.detailDepo=true;
    this.detailDoc=true;
       this.index=i;
      this.liassefiscaleInfo=this.user.tracabilites[this.index].liassefiscale;
      this.depotNature=this.user.tracabilites[this.index].natureDepot;
      
       this.idLiasse=this.liassefiscaleInfo.id;
      this.nombreDocs=this.liassefiscaleInfo.documents.length;
      this.date=JSON.stringify(this.user.tracabilites[this.index].dateDepot);
    
     this.documents= this.liassefiscaleInfo.documents;
     ;
        
      }
    
      download(id: number,i:number) {
        console.log(this.documents[i].detailDoc.nomFichier);
        
        this.detailDocFile.downloadFile(id).subscribe((blob: Blob) => {
         // console.log(blob);
          this.extension=blob.type.split('/');
         // console.log(this.extension[this.extension.length-1])
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = this.documents[i].detailDoc.nomFichier ; // Remplacez par le nom de fichier souhaité file-name.${this.extension[this.extension.length-1]}
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
      }

      
    
    
  getAllDocs(){
     return this.docService.getAllDocs().subscribe(res=>{
     // console.log(res);
     })
  }
   

  //confirmer liasse
  
  confirmerLiasse(i:number){
       this.depotNature='confirmée';
       this.user.tracabilites[i].natureDepot=this.depotNature;
       this.tracabiliteService.updateTracabilite( this.user.tracabilites[i].id, this.user.tracabilites[i]).subscribe((res)=>{
        console.log(res);
       })


  }
 
   
    }
       

        
        
         
            
     
  
  




