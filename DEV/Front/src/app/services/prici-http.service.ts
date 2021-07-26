import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from '../entities/globals';
import { map } from 'rxjs/operators';
import { Prici, PriciHTTP } from '../entities/prici.entity.ts';

@Injectable({
  providedIn: 'root'
})
export class PriciHttpService {

  private _url = '/api/PriceEthereumUs';

  constructor(private httpClient: HttpClient, private gb: Globals) {
    this._url = this.gb.WS + this._url;
  }

  GetLastPriceEtheriumUs(UserKey: string): Observable<Prici> {
    const _headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const url = `${this._url}/GetLastPriceEtheriumUs?UserKey=${UserKey}`;
    return this.httpClient.get<PriciHTTP>(url, _headers)
      .pipe(
        map(prici => new Prici(
          prici.ethusd,
          prici.ethusd_datetime, 
        )
        )
      );
  }

  EditPriceEtheriumUs(UserKey: string, ethusd: Number): Observable<boolean> {

    const _headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = `${this._url}/EditPriceEtheriumUs?UserKey=${UserKey}&ethusd=${ethusd}`;
    return this.httpClient.put<boolean>(url, _headers)
      .pipe(
        // tap( data => console.log(data)),
        map(result => result)
        // tap( data => console.log(data))
      );
  }

}
