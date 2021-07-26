import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {




  constructor( private dataService: DataService) { }

  ngOnInit(): void {   
  }







}
