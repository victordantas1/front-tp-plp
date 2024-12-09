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

    // Obter todas as chaves únicas de todos os objetos dentro de 'files'
    const allKeys: string[] = Array.from(new Set(this.apiResponse['files'].flatMap((file: any) => Object.keys(file))));

    const csvRows: string[] = [];

    // Adicionar cabeçalho (todas as chaves)
    csvRows.push(allKeys.join(','));

    // Adicionar dados das linhas
    for (const row of this.apiResponse['files']) {
      const values = allKeys.map((key: string) => {
        const value = row[key] !== undefined ? row[key] : '';  // Usar valor vazio se a chave não existir
        return `"${value}"`;  // Corrigido: Adicionar aspas para lidar com vírgulas nos valores
      });
      csvRows.push(values.join(','));
    }

    // Criar o conteúdo do CSV
    const csvContent = csvRows.join('\n');

    // Criar um blob para download
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
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
