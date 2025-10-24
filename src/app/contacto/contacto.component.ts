import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  imports: [CommonModule],
  standalone: true
  
})
export class ContactoComponent implements OnInit {

  productos!:any[]
  constructor() { }

  ngOnInit() {
  }

}
