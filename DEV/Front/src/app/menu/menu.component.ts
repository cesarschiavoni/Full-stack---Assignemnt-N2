import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @ViewChild('sidenav', { static: false }) sidenav= <MatSidenav>{};

  reason = '';
  userName= '';
  validtoken= false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dataService: DataService,
    private router: Router
  ) {
    
  }


  ngOnInit() {
    this.dataService.validtoken$.subscribe(validtoken => this.validtoken = (/true/i).test(validtoken));
    this.dataService.usrName$.subscribe(user => this.userName = user);
    const usrName = localStorage.getItem('usrName') || '';    
    const token = localStorage.getItem('token') || '';
    if ((usrName !== null) && (token !== null) && usrName !== '') {
      this.dataService.UserName(usrName); 
      this.dataService.validtoken('true');
    } else {
      this.dataService.UserName('');  
      this.dataService.validtoken('false');
    }
  }


  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  EditarUsuario() {
    this.router.navigate(['/usuarios', 'editar', localStorage.getItem('usrId')]);
  }

  LogOut() {
    localStorage.setItem('token', '');
    this.dataService.validtoken('false');
    localStorage.setItem('usrEmail', '');
    this.router.navigate(['home']);  
  }
}
