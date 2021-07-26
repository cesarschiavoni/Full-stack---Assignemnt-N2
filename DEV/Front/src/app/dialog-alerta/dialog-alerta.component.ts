import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-alerta',
  templateUrl: './dialog-alerta.component.html',
  styleUrls: ['./dialog-alerta.component.scss']
})
export class DialogAlertaComponent implements OnInit {

  alerta: String;


  constructor(
    private dialogRef: MatDialogRef<DialogAlertaComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: {alerta: string}) { 
    this.alerta = String(data.alerta);
  }

  ngOnInit() {
  
   }

  CerrarDialog() {
    this.dialogRef.close();
  }

 

}
