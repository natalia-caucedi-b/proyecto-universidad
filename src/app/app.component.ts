import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule,RouterModule, CommonModule], 
  templateUrl: './app.component.html',
  styles: '',
})
export class AppComponent {
  title = 'Maru crochet';
}
