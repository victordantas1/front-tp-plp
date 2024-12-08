import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-forms',
  standalone: true,
  templateUrl: './home-forms.component.html',
  styleUrls: ['./home-forms.component.css']
})
export class HomeFormsComponent {
  selectedFiles: File[] = []; // Array para armazenar os arquivos selecionados

  constructor(private http: HttpClient, private router: Router) { }

  // Manipulador do evento de seleção de arquivos
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files); // Armazenando os arquivos selecionados
      console.log('Arquivos selecionados:', this.selectedFiles);
    }
  }
  // Método para submeter os arquivos

  onSubmit(event: Event): void {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    console.log('forms enviado');

    if (this.selectedFiles.length > 0) {
      console.log('Enviando arquivos: ', this.selectedFiles);
      this.uploadFiles(this.selectedFiles).subscribe({
        next: (response: any) => {  // Defina o tipo da resposta
          console.log('Resposta da API:', response);
          this.router.navigate(['/reponse']);
        },
        error: (error: any) => {  // Defina o tipo do erro
          console.error('Erro ao enviar arquivos:', error);
          console.log('Erro ao chamar a API:', error);
        },
        complete: () => {
          console.log('Envio concluído.');
        }
      });
    } else {
      console.log('Nenhum arquivo selecionado.');
    }
  }

  // Método para enviar os arquivos via POST
  uploadFiles(files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name); // Adicionando arquivos ao FormData
    });

    // Substitua 'URL_DA_SUA_API' pela URL real da sua API
    return this.http.post('http://localhost:3000/upload', formData);
  }
}



