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
  private apiResponse: any;
  constructor(private http: HttpClient, private logInfoService: LogInfoService) { }

  ngOnInit(): void {
    this.apiResponse = this.logInfoService.getResponse()
  }

  carregarDados(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.infoLog = data;
      },
      error: (error) => {
        console.error('Erro ao carregar os dados:', error);
        this.erros = 'Erro ao obter dados da API.';
      },
      complete: () => {
        console.log('Requisição completa.');
      },
    });
  }

  exportCSV(): void {
    console.log('Exportando CSV...');
    // Implementar lógica de exportação
  }
}







