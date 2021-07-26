import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router,
    private dialog: MatDialog) { }
  canActivate(): boolean {  
 
    if (!this.auth.isAuthenticated()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
      };     
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }



 
}
