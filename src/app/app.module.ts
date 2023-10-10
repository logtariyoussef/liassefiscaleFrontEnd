import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { DepotLiasseFiscaleComponent } from './depot-liasse-fiscale/depot-liasse-fiscale.component';
import { FooterComponent } from './footer/footer.component';
import { SuiviDepotsComponent } from './suivi-depots/suivi-depots.component';
import { DepotsEnCoursComponent } from './depots-en-cours/depots-en-cours.component';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { PopupComponent } from './popup/popup.component';
import { PopupupdateComponent } from './popupupdate/popupupdate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DepotLiasseFiscaleComponent,
    FooterComponent,
    SuiviDepotsComponent,
    DepotsEnCoursComponent,
    PopupComponent,
    PopupupdateComponent
  ],
  imports: [
    BrowserModule,FormsModule,AppRoutingModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
