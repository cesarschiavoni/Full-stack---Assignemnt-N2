import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogAlertaComponent } from 'src/app/dialog-alerta/dialog-alerta.component';
import { Prici } from 'src/app/entities/prici.entity.ts';
import { PriciHttpService } from 'src/app/services/prici-http.service';

@Component({
  selector: 'app-prici-edition',
  templateUrl: './prici-edition.component.html',
  styleUrls: ['./prici-edition.component.scss']
})
export class PriciEditionComponent implements OnInit {
  isDesktop = false;
  mostrarCargando = false;
  Prici= <Prici>{};
  operacion = "";
  clicked = false;
  
  constructor(
    private _activeRoute: ActivatedRoute,
    private _PricisHttpService: PriciHttpService,
    private _router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const usrId = localStorage.getItem('keyApi') || ''; 
    this._PricisHttpService.GetLastPriceEtheriumUs(usrId).subscribe(res => this.Prici = res);
  }

  clickAceptar() {
    this.clicked = true;
  }

  CargarPrici(td: Prici): void {
    this.Prici = td;   
  }

  Regresar(borrar: Boolean) {  
    this._router.navigate(['/home']);
  }

  Guardar(formValue: any) {
    this.mostrarCargando = true;
    this.Prici = { ...this.Prici, ...formValue };
    const usrId = localStorage.getItem('keyApi') || ''; 
      this._PricisHttpService.EditPriceEtheriumUs(usrId,this.Prici.ethusd).subscribe(res => {
        if (res == true) {          
          this.mostrarCargando = false;
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.data = { alerta: "El precio ha sido modificada correctamente" };
          this.dialog.open(DialogAlertaComponent, dialogConfig);
          this.Regresar(true);
        } else{
          this.mostrarCargando = false;
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.data = { alerta: "El precio NO ha sido modificada correctamente" };
          this.dialog.open(DialogAlertaComponent, dialogConfig);
          this.Regresar(true);
        }
      });   
  }

}
