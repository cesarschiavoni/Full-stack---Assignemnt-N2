import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Wallet } from 'src/app/entities/wallets';
import { WalletHttpService } from 'src/app/services/wallet-http.service';

@Component({
  selector: 'app-wallets-list',
  templateUrl: './wallets-list.component.html',
  styleUrls: ['./wallets-list.component.scss']
})
export class WalletsListComponent implements OnInit {

  @Input() wallets: Wallet[] = [];
  @Input() walletSeleccionada = <Wallet>{};
  @Output() seleccion = new EventEmitter<Wallet>();

  displayedColumns = ['Name', 'AccountBalanceEth', 'TranDate', 'Favorite', 'Old', 'TranDate', 'TranDate', 'Acciones'];

  constructor(private _WalletsHttpService: WalletHttpService) { }

  ngOnInit(): void {
  }

  Seleccionar(Wallet: Wallet) {
    this.walletSeleccionada = Wallet;
    this.seleccion.emit(Wallet);
  }

  Favorito(Wallet: Wallet) {
    switch (Wallet.Favorite) {
      case true:
        {
          Wallet.Favorite = false;
          break;
        }
      case false:
        {
          Wallet.Favorite = true;
          break;
        }
    }
    this._WalletsHttpService.EditWallet(Wallet).subscribe(result =>  {
      if(result == true)
      {
        this.Recargar();
      }
      });
  }

  Recargar() {
    const usrId = localStorage.getItem('keyApi') || '';
    this._WalletsHttpService.GetAllWallet(usrId, true).subscribe(wall => (this.wallets = wall));
  }

}
