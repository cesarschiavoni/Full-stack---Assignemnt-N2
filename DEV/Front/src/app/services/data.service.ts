import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

 @Injectable({
  providedIn: 'root'
})
export class DataService {


  private _validtoken = new Subject<string>();
  private _usrName = new Subject<string>();



  public validtoken$ = this._validtoken.asObservable();
  public usrName$ = this._usrName.asObservable();
 

  constructor() {
    
   }


  validtoken(valid: string) {
    this._validtoken.next(valid);
  }

  UserName(userName: string) {
    this._usrName.next(userName);
  }





}
