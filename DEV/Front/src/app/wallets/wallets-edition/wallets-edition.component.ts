import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogAlertaComponent } from 'src/app/dialog-alerta/dialog-alerta.component';
import { Wallet } from 'src/app/entities/wallets';
import { WalletHttpService } from 'src/app/services/wallet-http.service';

@Component({
  selector: 'app-wallets-edition',
  templateUrl: './wallets-edition.component.html',
  styleUrls: ['./wallets-edition.component.scss']
})
export class WalletsEditionComponent implements OnInit {
  isDesktop = false;
  mostrarCargando = false;
  wallet= <Wallet>{};
  operacion = "";
  clicked = false;

  constructor(
   
    private _activeRoute: ActivatedRoute,
    private _WalletsHttpService: WalletHttpService,
    private _router: Router,
    private dialog: MatDialog
   ) { }

  ngOnInit(): void {
    const innerWidth = window.innerWidth;
    if (innerWidth <= 700) {
      this.isDesktop = false;
    } else {
      this.isDesktop = true;
    }   
    const id = this._activeRoute.snapshot.paramMap.get('id');
    this.operacion = this._activeRoute.snapshot.paramMap.get('operacion') || '';
    switch (this.operacion) {
      case 'editar': {
        // editar
        const usrId = localStorage.getItem('keyApi') || ''; 
        // tslint:disable-next-line:max-line-length
        this._WalletsHttpService.GetWallet(Number(id), usrId).subscribe(td => this.CargarWallet(td), error => this.handleError(error), () => console.log('Wallet:', this.wallet));
        break;
      }
      case 'agregar': {

        // agregar
      
        break;
      }
    }
  }

  handleError(error: any): void {
  
  }

  clickAceptar() {
    this.clicked = true;
  }

  CargarWallet(td: Wallet): void {
    this.wallet = td;   
  }

  Regresar(borrar: Boolean) {  
    this._router.navigate(['/wallet']);
  }

  Guardar(formValue: any) {
    this.mostrarCargando = true;
    this.wallet = { ...this.wallet, ...formValue };
    if (this.operacion === 'editar') {
      this._WalletsHttpService.EditWallet(this.wallet).subscribe(res => {
        if (res == true) {          
          this.mostrarCargando = false;
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.data = { alerta: "Su billetera ha sido modificada correctamente" };
          this.dialog.open(DialogAlertaComponent, dialogConfig);
          this.Regresar(true);
        }  else {
          this.mostrarCargando = false;
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.data = { alerta: "Su billetera NO ha sido creada correctamente" };
          this.dialog.open(DialogAlertaComponent, dialogConfig);
          this.Regresar(true);
        }
      });
    } else {
      const usrId = localStorage.getItem('keyApi') || ''; 
      this.wallet.UserKey = usrId;
      this._WalletsHttpService.AddWallet(this.wallet).subscribe(id => {
        if (id !== null) {         
          this.mostrarCargando = false;         
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.data = { alerta: "Su billetera ha sido creada correctamente" };
          this.dialog.open(DialogAlertaComponent, dialogConfig);
          this.Regresar(true);
        } else {
          this.mostrarCargando = false;
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.data = { alerta: "Su billetera NO ha sido creada correctamente" };
          this.dialog.open(DialogAlertaComponent, dialogConfig);
          this.Regresar(true);
        }
      }
      );
    }  
  }

}
