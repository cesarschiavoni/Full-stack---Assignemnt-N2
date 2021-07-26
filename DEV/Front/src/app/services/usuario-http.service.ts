import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario, UsuarioHTTP } from '../entities/usuario.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Globals } from '../entities/globals';

@Injectable({
  providedIn: 'root'
})
export class UsuarioHttpService {

  private _url = '/api/Usuario';


  constructor(private httpClient: HttpClient, private gb: Globals) {
   this._url = this.gb.WS + this._url;
  }

  GetByParam(pusuarioHTTP: UsuarioHTTP): Observable<Usuario[]> {

    const _headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.post<UsuarioHTTP[]>(this._url + '/GetByParam', pusuarioHTTP, _headers)
      .pipe(
        // tap( data => console.log(data)),
        map(usuarioHTTP0 => usuarioHTTP0.map(usuarioHTTP => new Usuario(
          usuarioHTTP.usr,
          usuarioHTTP.keyApi
        ))
        )
        // tap( data => console.log(data))
      );
  }

}