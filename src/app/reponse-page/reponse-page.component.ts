import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reponse-page',
  templateUrl: './reponse-page.component.html',
  styleUrls: ['./reponse-page.component.css'],
})
export class ReponsePageComponent implements OnInit {
  cpuUso = '';
  cpuTemp = '';
  gpuUso = '';
  gpuTemp = '';
  ramUso = '';
  ramDisponivel = '';
  discoUso = '';
  discoDisponivel = '';
  erros = '';

  private apiUrl = 'http://localhost:3000/upload'; // Substitua pela URL da API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.cpuUso = data.cpuUso;
        this.cpuTemp = data.cpuTemp;
        this.gpuUso = data.gpuUso;
        this.gpuTemp = data.gpuTemp;
        this.ramUso = data.ramUso;
        this.ramDisponivel = data.ramDisponivel;
        this.discoUso = data.discoUso;
        this.discoDisponivel = data.discoDisponivel;
        this.erros = data.erros || 'Nenhum erro detectado.';
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







