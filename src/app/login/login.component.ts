import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { User } from '../Model/User';
import { Router } from '@angular/router';
import { DepotLiasseFiscaleComponent } from '../depot-liasse-fiscale/depot-liasse-fiscale.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
 
  userExist=new User();
   user=new User();
 
 
  matriculeUser:string='';
  motdePasseUser:string='';
 

 constructor(private router:Router,private userService:UserService){}

 ngOnInit(){
 //localStorage.clear();
 }


 getUserByMatricule(){
  return this.userService.getUserByMat(this.matriculeUser).subscribe((res)=>{
    
    console.log(res);
    this.userExist=res;
    if(this.userExist===null){
        
          alert("matricule invalide !");
    }else {
      
      localStorage.setItem('userExist',JSON.stringify(this.userExist));
   this.user=JSON.parse(localStorage.getItem('userExist')||'{}');
   console.log(this.user);
   console.log(this.user.motdePasse===this.motdePasseUser);
   if(this.user.motdePasse===this.motdePasseUser){
    this.router.navigate([`/depotLiasse`]);
   }else {
    alert("mot de passe incorrect !");
   }
    }
   //console.log(this.userExist);
   
   //console.log(this.user);
  // if(JSON.stringify(this.user.matriculeFiscale===this.matriculeUser) && JSON.stringify(this.user.motdePasse===this.motdePasseUser)){
   // this.router.navigate([`/depotLiasse`]);
   //}else{
   // alert("no!!!!!!!!");
   //}
   
 },error=>{
  console.log(error)
 })}















  onSubmit(myForm:NgForm){
  
   this.getUserByMatricule();
   
  
   
   
     
}
  }
