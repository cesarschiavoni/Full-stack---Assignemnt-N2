import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginHTTP } from '../entities/login.entity';
import { Observable } from 'rxjs';
import { Globals } from '../entities/globals';


@Injectable({
  providedIn: 'root'
})

export class LoginHttpService {

  private _url = '/api/login/authenticate';

  constructor(private httpClient: HttpClient, private gb: Globals) {
   this._url = this.gb.WS + this._url;
  }


  Authenticate(Username: string, Password: string): Observable<string> {

    const al = new LoginHTTP(Username, Password);

    return this.httpClient.post<string>(this._url, al);
  }

}
