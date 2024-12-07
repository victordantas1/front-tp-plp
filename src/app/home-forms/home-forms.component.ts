import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importando apenas o HttpClient
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-forms',
  standalone: true, // Para componentes standalone
  templateUrl: './home-forms.component.html',
  styleUrls: ['./home-forms.component.css']
})
export class HomeFormsComponent {
  constructor(private http: HttpClient) {}

  // Manipulador do evento de seleção de arquivos
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      console.log('Arquivos selecionados:', files);

      // Chama o método para fazer upload de arquivos
      this.uploadFiles(files).subscribe({
        next: (response: any) => {  // Defina o tipo da resposta, geralmente `any` ou um tipo específico de resposta da sua API
          console.log('Resposta da API:', response);
        },
        error: (error: any) => {  // Defina o tipo do erro, geralmente `any` ou um tipo específico de erro da sua API
          console.error('Erro ao enviar arquivos:', error);
        },
        complete: () => {
          console.log('Envio concluído.');
        }
      });
    }
  }

  // Metodo para enviar os arquivos via POST
  uploadFiles(files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name); // Adicionando arquivos ao FormData
    });

    // Substitua 'URL_DA_SUA_API' pela URL real da sua API
    return this.http.post('URL_DA_SUA_API', formData);
  }
}

