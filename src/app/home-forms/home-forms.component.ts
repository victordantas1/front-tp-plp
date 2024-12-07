import { Component } from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home-forms',
  templateUrl: './home-forms.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./home-forms.component.css']
})
export class HomeFormsComponent {
  form: FormGroup;
  file: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      console.log('Arquivos selecionados:', files);
      // Adicione lógica para manipular os arquivos aqui
    }
  }

  onSubmit() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);

      this.http.post('https://sua-api.com/upload', formData).subscribe(
        (response) => console.log('Upload com sucesso!', response),
        (error) => console.error('Erro no upload', error)
      );
    } else {
      console.error('Nenhum arquivo selecionado');
    }
  }
}
