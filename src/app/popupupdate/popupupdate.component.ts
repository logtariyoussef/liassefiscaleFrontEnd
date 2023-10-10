import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popupupdate',
  templateUrl: './popupupdate.component.html',
  styleUrls: ['./popupupdate.component.css']
})
export class PopupupdateComponent implements OnInit {
  showPopup=true;
  years:number[]=[2010,2011,2012,2013,2014,2015,2016,2017,2018];
 
  closePopup(){
    this.showPopup=false;
  }

  ngOnInit(): void {
   
  }
}
