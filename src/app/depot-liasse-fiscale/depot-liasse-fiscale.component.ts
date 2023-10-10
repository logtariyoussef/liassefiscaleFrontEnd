import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Catégorie } from '../Model/Catégorie';
import { CategorieService } from '../Services/categorie.service';
import { LiasseFiscale } from '../Model/LiasseFiscale';
import { Document } from '../Model/Document';
import { LiasseService } from '../Services/liasse.service';
import { DocumentsService } from '../Services/documents.service';
import { DétailDoc } from '../Model/DétailDoc';
import { DetailsDocsService } from '../Services/details-docs.service';
import { User } from '../Model/User';
import { TracabiliteService } from '../Services/tracabilite.service';
import { Tracabilité } from '../Model/Tracabilité';
import { PartageLiasseService } from '../Services/partage-liasse.service';

@Component({
  selector: 'app-depot-liasse-fiscale',
  templateUrl: './depot-liasse-fiscale.component.html',
  styleUrls: ['./depot-liasse-fiscale.component.css']
})
export class DepotLiasseFiscaleComponent implements OnInit {

  


  showTable = true;
  typefichier: String = '';
  years:number[]=[2010,2011,2012,2013,2014,2015,2016,2017,2018];

  categorieLiasse!: Catégorie[];

  //liasseCreated=new LiasseFiscale();

  categorie: Catégorie = new Catégorie();

  liasse: LiasseFiscale = new LiasseFiscale();

  document: any;
  documents!: Document[];

  listLiasse!: LiasseFiscale[];

  file!: File;

  fileDetails: DétailDoc = new DétailDoc();

  index!: number;

  listCodes: number[] = [];
  listDocsId:number[]=[];

  isDisabled: Boolean = true;
  user = new User();
  trac = new Tracabilité();
  localDate: Date = new Date();
  isActivated:boolean=true;
  idDoc!:number;
  idDétailDoc!:number;
  showPopup=false;
  depotNature:string='';
  liasseUpdated=new LiasseFiscale();
  methodName:string='';
  tracabiliteUpdated=new Tracabilité();
  activateCount=0;

  documentTable=[{
     code:"F6001", libelle:"Bilan actif",natureDoc:"	Obligatoire",formatDoc:"XML",valide:false}
  ,{code:"F6002", libelle:"Bilan passif",natureDoc:"	Obligatoire",formatDoc:"XML",valide:false},
  {code:"F6003", libelle:"Etat de résultat",natureDoc:"	Obligatoire",formatDoc:"XML",valide:false},
  {code:"F6004", libelle:"Etat de flux de trésorerie",natureDoc:"	Obligatoire",formatDoc:"XML",valide:false},
  {code:"F6005", libelle:"Tableau de détermination",natureDoc:"	Obligatoire",formatDoc:"XML",valide:false},
  {code:"F6006", libelle:"Notes, principes",natureDoc:"	Obligatoire",formatDoc:"XML",valide:false},
  {code:"F6007", libelle:"Faits marquants de l’exercice",natureDoc:"	Obligatoire",formatDoc:"XML",valide:false}


]

  



  constructor(private categorieService: CategorieService, private liasseService: LiasseService,
    private documentService: DocumentsService, private detailDocService: DetailsDocsService,
    private tracabiliteService: TracabiliteService,private partageLiasseService:PartageLiasseService) {

  }
 



  ngOnInit(): void {
    this.getAllCategories();
   this.user=JSON.parse(localStorage.getItem("userExist")||'{}') ;
  console.log(this.user);
   this.liasse=this.partageLiasseService.liasseFiscale;
   this.methodName=this.partageLiasseService.method;
 
  this.tracabiliteUpdated=this.partageLiasseService.tracabilite;
  console.log(this.tracabiliteUpdated);
 

  }

  confirm(){
    this.depotNature='confirmée';
    this.addLiasseToDocs();
   this.showPopup=false;
  }
  cancel(){
    this.depotNature='pas encore...';
    this.addLiasseToDocs();
    this.showPopup=false;
  }



  onShowTable() {

    this.showTable = false;
    this.createLiasse();
    //console.log(this.liasse.exercice);
    this.saveTracabilite();
    this.getCategorieById();
    
    

  }


  //get list of categories
  getAllCategories() {
    return this.categorieService.getListCategorie().subscribe((res) => {
      this.categorieLiasse = res;
    }, error => {
      console.log(error)
    })
  }

 
  onChange(event: any,i:number ) { //i: number
   // console.log(this.documentTable[i].code);
    this.file = event.target.files[0];
   // console.log(this.file);
    //console.log(this.file.name);
  
  this.document=this.documentTable[i];
  if(this.methodName==='create'){
    this.createDocument();
  }
  
   if(this.document.code.toString()+'-'+this.user.matriculeFiscale.toString()+'-'+this.liasse.exercice+'.xml'===this.file.name){
    this.uploadFile();
   }else {
    alert("verifier le nom du fichier");
   }
    
  
  
  

    
  }
  

  //function to upload file
  uploadFile() {
    this.detailDocService.createDetailDoc(this.file).subscribe((data) => {
      this.fileDetails = data;

    }, error => {
      console.log(error);
    })
  }

  //function for adding the file uploaded to his document

  addFileToDoc(id: number) {
   

    this.documentService.getAllDocs().subscribe((res) => {
       this.documents=res;
       id=this.document.id;
       this.listDocsId.push(id);
     // console.log(this.listDocsId);
    return this.documentService.addFileToDoc(this.documents[id-1].id, this.fileDetails.id).subscribe((data) => {
      this.document = data;
     // console.log(this.document);
      this.idDoc=this.document.id;
      this.idDétailDoc=this.document.detailDoc.id;
        
    return this.detailDocService.addXsdToDetailDoc(this.idDoc).subscribe(res=>{
     // console.log(res);
       return this.detailDocService.validateXml(this.idDoc).subscribe((res)=>{
      
     
      
        console.log(res);
       
          this.isActivated=!res;
          if (this.isActivated){
            alert(this.file.name +"n'est pas compatible a son xsd");
          }
        
        
      
       })
    },error=>{
      console.log(error);
    })
      
    },error=>{
      console.log(error);
    })
  })
  
}

addOrupdateFileToDoc(i:number){
  if(this.methodName==='create'){
    this.addFileToDoc(i);
  }else if (this.methodName==='update'){
    this.updateFileToDoc(i);
  }
}

//update File to doc
updateFileToDoc(i: number) {
  return this.documentService.addFileToDoc(this.liasse.documents[i].id, this.fileDetails.id).subscribe((data) => {
    this.document = data;
    console.log(this.document);
    this.idDoc=this.document.id;
    this.idDétailDoc=this.document.detailDoc.id;
      
  return this.detailDocService.addXsdToDetailDoc(this.idDoc).subscribe(res=>{
   // console.log(res);
     return this.detailDocService.validateXml(this.idDoc).subscribe((res)=>{
     this.isActivated=!res;
     })
  },error=>{
    console.log(error);
  })
    
  },error=>{
    console.log(error);
  })

}

  //get categorie by id
  getCategorieById() {
    return this.categorieService.getCategorieById(this.categorie.id).subscribe(res => {
      this.categorie = res;
    },error=>{
      console.log(error);
    }

    )
  }

  //create liasse fiscale
  createLiasse() {
    return this.liasseService.createLiasse(this.liasse).subscribe((res) => {
      this.liasse = res;
    },error=>{
      console.log(error);
    })
  }

  //function to add liasse to their docs
  addLiasseToDocs() {

    this.liasseService.addLiasseToDocs(this.liasse.id,this.listDocsId).subscribe((res) => {
      this.documents = res;
    },error=>{
      console.log(error);
    })
    if(this.methodName==='create'){
      this.addUserAndLiasseTotrac();
    }else if(this.methodName==='update'){
      this.tracabiliteUpdated.dateDepot = this.localDate.toString();
      this.tracabiliteUpdated.natureDepot=this.depotNature;
    
      this.tracabiliteService.updateTracabilite(this.tracabiliteUpdated.id,this.tracabiliteUpdated).subscribe((res)=>{
        this.partageLiasseService.tracabilite=res;
        console.log(this.partageLiasseService.tracabilite);
        this.liasse=new LiasseFiscale();
      })
      
    }
    //this.addUserAndLiasseTotrac();
    this.liasse = new LiasseFiscale();
    this.categorie = new Catégorie();
  }

  //deposer liasse
  deposerLiasse() {
   // this.addLiasseToDocs();
   this.showPopup=true;
   
  }


  //save tracabilite
  saveTracabilite() {
    return this.tracabiliteService.saveTracabilite(this.trac).subscribe((res) => {
      this.trac = res;

    })
  }

  
  //function to add liasse and user to their trac
  addUserAndLiasseTotrac() {
    return this.tracabiliteService.addUserAndLiasseTotrac(this.user.matriculeFiscale, this.trac.id, this.liasse.id)
      .subscribe(res => {
        this.trac = res;
        this.trac.dateDepot = this.localDate.toString();
        this.trac.natureDepot=this.depotNature;
        this.updateTrace(this.trac.id);
        
      },error=>{
        console.log(error);
      })

  }

  //update tracabilite
  updateTrace(id:number) {
    return this.tracabiliteService.updateTracabilite(id, this.trac).subscribe((res) => {
      this.trac = res;
     
      //console.log(this.trac);
    }, error => {
      console.log(error);
    })
  }

  //create document
  createDocument(){
    this.documentService.createDoc(this.document).subscribe((res)=>{
      this.document=res;
    
     this.addDocToCate();
    },error=>{
      console.log(error);
    })
  }


  //add doc to categorie
  addDocToCate(){
    return this.documentService.addDocToCate(this.document.id,this.categorie.id).subscribe((res)=>{
      this.document=res;
    },error=>{
      console.log(error);
    })
  }


  //validate xml file
 /* validateXmlFile(id:Number){
    return this.detailDocService.validateXml(id).subscribe((res)=>{
         this.isActivated=res;
         console.log(this.isActivated);
    })
  }*/

 /* addXsdToDetailDoc(idDoc:Number){
    return this.detailDocService.addXsdToDetailDoc(idDoc).subscribe((data)=>{
      console.log(data);
    })
  }*/

  updateLiasse(){
    this.showTable=true;
    return this.liasseService.updateLiasse(this.liasse.id,this.liasse).subscribe((res)=>{
      this.liasse=res;
      console.log(this.liasse);
    
    },error=>{
      console.log(error);
    })

  }
  
}
