import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';




const routes = [
  { path: ':aviso',  component: LoginComponent },
  { path: '**',  component: LoginComponent },
  { path: '',  component: LoginComponent }
];

@NgModule({
  imports: [     
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,  
    MatInputModule,
    MatDialogModule,
   // ShareModule,
    //AdsenseModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
