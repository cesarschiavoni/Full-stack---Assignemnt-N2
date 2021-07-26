import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginHttpService } from '../services/login-http.service';
import { DataService } from '../services/data.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogAlertaComponent } from '../dialog-alerta/dialog-alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioHttpService } from '../services/usuario-http.service';
import { Usuario, UsuarioHTTP } from '../entities/usuario.entity';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mensajePopUp = '';
  mensajePopUpId = 30;
  isDesktop = false;
  altura = 0;
  ancho = 0;
  username = '';
  password = '';
  hideCA = true;
  hideNC = true;
  hideRC = true;
  clicked = false;

  constructor(
    private router: Router,
    private dataService: DataService,
    private _loguinData: LoginHttpService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    public _UsuariosHttpService: UsuarioHttpService,

  ) {
    window.addEventListener("beforeunload", this.AvisarSalidaSitio);   
  }

  AvisarSalidaSitio(e: any) {
    e.defaultPrevented;
    e.returnValue = '';
  }

  clickAceptar() {
    this.clicked = true;
  }

  ngOnDestroy() {
    window.removeEventListener("beforeunload", this.AvisarSalidaSitio);
  }



  ngOnInit() {
    this.altura = window.innerHeight * 0.20;
    this.ancho = window.innerWidth;   
    localStorage.setItem('token', '');
    this.dataService.validtoken('false');
    localStorage.setItem('usrName', ''); 
    const innerWidth = window.innerWidth;
    if (innerWidth <= 700) {
      this.isDesktop = false;
    } else {
      this.isDesktop = true;
    } 
  }
 





  login() {
    this._loguinData.Authenticate(this.username, this.password).subscribe(token => this.AccionesDeLog(token));
    this.clicked = false;  
  }

  AccionesDeLog(token: string) {
    if (token !== '') {
      if (token.includes("cuenta") === true || token.includes("Contraseña") === true) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;2
        dialogConfig.data = { alerta: token };
        this.dialog.open(DialogAlertaComponent, dialogConfig);
      } else {    
        this.dataService.UserName(this.username);         
        localStorage.setItem('token', token);     
        this.dataService.validtoken('true');
        let usuarioHTTP: UsuarioHTTP;       
        usuarioHTTP = <UsuarioHTTP><unknown>{ usr: this.username, keyApi: '' };
        this._UsuariosHttpService.GetByParam(usuarioHTTP).subscribe(items => this.Redirigir(items[0]))      

      }
    }
  } 
  
  Redirigir(arg0: Usuario): void {
    localStorage.setItem('keyApi', arg0.keyApi);   
    this.router.navigate(['home']);
  }
  

  Regresar() {
    this.router.navigate(['home']);
  }  
}
