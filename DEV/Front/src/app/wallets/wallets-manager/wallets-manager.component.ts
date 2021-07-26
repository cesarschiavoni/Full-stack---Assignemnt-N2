import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Wallet } from 'src/app/entities/wallets';
import { WalletHttpService } from 'src/app/services/wallet-http.service';

@Component({
  selector: 'app-wallets-manager',
  templateUrl: './wallets-manager.component.html',
  styleUrls: ['./wallets-manager.component.scss']
})
export class WalletsManagerComponent implements OnInit {

  isDesktop = false;
  altura = 0;
  ancho = 0;
  mostrarCargando = true;
  wallets: Wallet[] = [];
  constructor(private _WalletData: WalletHttpService,   private router: Router,) { }

  ngOnInit(): void {
    this.altura = window.innerHeight * 0.20;
    this.ancho = window.innerWidth;  
    const usrId = localStorage.getItem('keyApi') || ''; 
    this._WalletData.GetAllWallet(usrId, true).subscribe(wall => (this.mostrarCargando = false, this.wallets = wall)); 
    const innerWidth = window.innerWidth;
    if (innerWidth <= 700) {
      this.isDesktop = false;
    } else {
      this.isDesktop = true;
    }
  }

  
  Seleccionar(wallet: Wallet) {
    this.router.navigate(['/wallet', 'editar', wallet.Id.toString()]);
  }

  Agregar() {
    this.router.navigate(['/wallet', 'agregar', '0']);
  }

  Regresar() {
    this.router.navigate(['/home']);
  }

 



}
