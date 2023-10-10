import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Output() confirme=new EventEmitter<string>;

  confirm():void{
    this.confirme.emit('confirmée');
  }

  cancel():void{
    this.confirme.emit('pas encore');
  }
}
