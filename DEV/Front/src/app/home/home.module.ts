
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';




const routes = [
  { path: '', component: PrincipalComponent }
];

@NgModule({
  imports: [     
    MatButtonModule,
    MatCardModule, 
    CommonModule,
    MatListModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PrincipalComponent
  ],
  bootstrap: [PrincipalComponent]
})
export class HomeModule { }
