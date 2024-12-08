import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LogInfoService} from "../log-info.service";

@Component({
  selector: 'app-reponse-page', // Identifica o seletor para uso no HTML
  templateUrl: './reponse-page.component.html', // Define o arquivo de template associado
  styleUrls: ['./reponse-page.component.css'], // Define o arquivo de estilos associado
})
export class ReponsePageComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/upload'; // Substitua pela URL da API
  private apiResponse: any;
  constructor(private http: HttpClient, private logInfoService: LogInfoService) { }

  // Método chamado automaticamente ao inicializar o componente
  ngOnInit(): void {
    this.apiResponse = this.logInfoService.getResponse()
    console.log("Dados recebidos: ", this.apiResponse)
  }

  // Método para carregar dados do backend
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
  // Método para obter o endereço IP do usuário
  getIPAddress(): void {
    this.http.get<any>('https://api.ipify.org?format=json').subscribe({
      next: (response) => {
        this.ip = response.ip; // Atualiza o IP com o valor retornado pela API
      },
      error: () => {
        this.ip = 'Erro ao obter o IP'; // Define mensagem de erro caso falhe
      },
    });
  }

  exportCSV(): void {
    // Organizando os dados que serão exportados
    const data = [
      ['CPU Uso', this.cpuUso],
      ['CPU Temp', this.cpuTemp],
      ['GPU Uso', this.gpuUso],
      ['GPU Temp', this.gpuTemp],
      ['RAM Uso', this.ramUso],
      ['RAM Disponível', this.ramDisponivel],
      ['Disco Uso', this.discoUso],
      ['Disco Disponível', this.discoDisponivel],
      ['Erros', this.erros],
      ['Endereço IP', this.ip],
    ];

    // Converte os dados para o formato CSV
    let csvContent = 'data:text/csv;charset=utf-8,';
    data.forEach((row) => {
      csvContent += row.join(',') + '\n'; // Concatena cada linha com vírgula
    });

    // Cria um link de download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'dados_sistema.csv'); // Nome do arquivo CSV

    // Aciona o clique do link para iniciar o download
    link.click();
  }
}





