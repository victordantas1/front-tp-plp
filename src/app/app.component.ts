import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeFormsComponent} from './home-forms/home-forms.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeFormsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trabalho-plp';
}
