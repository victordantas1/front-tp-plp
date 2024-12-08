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
    console.log("Dados recebidos: ", this.apiResponse)
  }

  carregarDados(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.logInfoService = data;
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
    // Implementar lógica de exportação
  }
}







