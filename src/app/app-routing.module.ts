import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepotLiasseFiscaleComponent } from './depot-liasse-fiscale/depot-liasse-fiscale.component';
import { DepotsEnCoursComponent } from './depots-en-cours/depots-en-cours.component';
import { LoginComponent } from './login/login.component';
import { SuiviDepotsComponent } from './suivi-depots/suivi-depots.component';

const routes: Routes = [
    {path:'login',component:LoginComponent},
    {
  path:'depotLiasse',component:DepotLiasseFiscaleComponent
}  ,
{path:'depotEnCours',component:DepotsEnCoursComponent},
{path:'suiviDepot',component:SuiviDepotsComponent},

{path:'',redirectTo:'login',pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }