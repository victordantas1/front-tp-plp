import { Component } from '@angular/core';

@Component({
  selector: 'app-home-forms',
  templateUrl: './home-forms.component.html',
  styleUrls: ['./home-forms.component.css']
})
export class HomeFormsComponent {
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      console.log('Arquivos selecionados:', files);
      // Adicione lógica para manipular os arquivos aqui
    }
  }
}
