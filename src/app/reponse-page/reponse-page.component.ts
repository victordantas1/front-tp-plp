import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LogInfoService} from "../log-info.service";

@Component({
  selector: 'app-reponse-page',
  templateUrl: './reponse-page.component.html',
  styleUrls: ['./reponse-page.component.css'],
})
export class ReponsePageComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/upload'; // Substitua pela URL da API
  protected apiResponse: any;
  constructor(private http: HttpClient, private logInfoService: LogInfoService) { }

  ngOnInit(): void {
    this.apiResponse = this.logInfoService.getResponse()
    console.log("Dados recebidos: ", this.apiResponse);
  }

  carregarDados(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
      },
      error: (error) => {
        console.error('Erro ao carregar os dados:', error);
      },
      complete: () => {
        console.log('Requisição completa.');
      },
    });
  }

  exportCSV(): void {
    console.log('Exportando CSV...');

    if (!this.apiResponse || !this.apiResponse['files'] || this.apiResponse['files'].length === 0) {
      console.error('Nenhum dado para exportar');
      return;
    }

    const csvRows: string[] = [];

    // Cabeçalhos do CSV
    csvRows.push('filename,type,value');

    // Iterar sobre cada arquivo em `files`
    for (const file of this.apiResponse['files']) {
      const filename = file['filename'] || ''; // Nome do arquivo

      // Mapear os valores de RAM, GPU, CPU, etc., em linhas verticais
      const types = ['ram', 'gpu', 'cpu', 'disk', 'ips'];
      for (const type of types) {
        if (file[type] && typeof file[type] === 'string') {
          const values = file[type].split(','); // Quebrar os valores separados por vírgulas
          for (const value of values) {
            csvRows.push(`${filename},${type},${value}`);
          }
        }
      }

      // Adicionar outros campos únicos, como IP
      if (file['ip']) {
        csvRows.push(`${filename},ip,${file['ip']}`);
      }
    }

    // Criar o conteúdo do CSV
    const csvContent = csvRows.join('\n');

    // Criar um blob para download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'dados.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
