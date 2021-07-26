import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { DialogAlertaComponent } from './dialog-alerta/dialog-alerta.component';
import { Globals } from './entities/globals';
import { MatStepperIntl } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminRoutingModule } from './app-routing.module';
import { ShareModule } from './share/share.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';




export function tokenGetter() {
  return localStorage.getItem('token');
}

registerLocaleData(localeEsAr, 'es-Ar');

@NgModule({
  imports: [ 
    MatButtonModule,
    MatFormFieldModule,  
    MatInputModule,
    AdminRoutingModule,
    ShareModule,   
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatTooltipModule,   
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule, 
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["ocupa.com.ar"],
      },
    }),       
  ],
  declarations: [
    AppComponent,
    MenuComponent,  
    DialogAlertaComponent,  
  ],
  entryComponents: [ DialogAlertaComponent  ],
  bootstrap: [AppComponent],
  providers: [DatePipe, Globals,
    { provide: LOCALE_ID, useValue: 'es-Ar' },
    { provide: MatStepperIntl }
  ]
})



export class AppModule {

}

