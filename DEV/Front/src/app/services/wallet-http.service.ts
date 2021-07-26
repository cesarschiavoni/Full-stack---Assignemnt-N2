import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../entities/usuario.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Wallet, WalletHTTP } from '../entities/wallets';
import { Globals } from '../entities/globals';



@Injectable({
  providedIn: 'root'
})
export class WalletHttpService {
  


  private _url = '/api/Wallet';

  constructor(private httpClient: HttpClient, private gb: Globals) {
    this._url = this.gb.WS + this._url;
  }


  GetAllWallet(usrId: string, OrderByFav: boolean): Observable<Wallet[]> {

    const _headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const url = `${this._url}/GetAllWallet?UserKey=${usrId}&OrderByFav=${OrderByFav}`;
    return this.httpClient.get<WalletHTTP[]>(url, _headers)
      .pipe(
        map(WalletHTTP0 => WalletHTTP0.map(wallets => new Wallet(
          wallets.Id,
          wallets.Name,
          wallets.AccountBalanceEth,
          wallets.TranDate,
          wallets.Favorite,
          wallets.Old,
          wallets.UserKey
        ))
        )
      );
  }

  GetWallet(Id: number, UserKey: string): Observable<Wallet> {
    const _headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const url = `${this._url}/GetWallet?Id=${Id}&UserKey=${UserKey}`;
    return this.httpClient.get<WalletHTTP>(url, _headers)
      .pipe(
        map(wallets => new Wallet(
          wallets.Id,
          wallets.Name,
          wallets.AccountBalanceEth,
          wallets.TranDate,
          wallets.Favorite,
          wallets.Old,
          wallets.UserKey
        )
        )
      );
  }

 

  EditWallet(Wallet: Wallet): Observable<boolean> {

    const _headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.put<boolean>(this._url + '/EditWallet', Wallet, _headers)
      .pipe(
        // tap( data => console.log(data)),
        map(usuarioHTTP0 => usuarioHTTP0)
        // tap( data => console.log(data))
      );
  }

  AddWallet(Wallet: Wallet): Observable<Number> {

    const _headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.post<Number>(this._url + '/AddWallet', Wallet, _headers)
      .pipe(
        // tap( data => console.log(data)),
        map(usuarioHTTP0 => usuarioHTTP0)
        // tap( data => console.log(data))
      );
  }






}
