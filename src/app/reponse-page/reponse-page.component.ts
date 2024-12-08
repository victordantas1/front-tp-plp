import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reponse-page', // Identifica o seletor para uso no HTML
  templateUrl: './reponse-page.component.html', // Define o arquivo de template associado
  styleUrls: ['./reponse-page.component.css'], // Define o arquivo de estilos associado
})
export class ReponsePageComponent implements OnInit {
// Propriedades do componente
  cpuUso = ''; // Armazena o uso da CPU
  cpuTemp = ''; // Armazena a temperatura da CPU
  gpuUso = ''; // Armazena o uso da GPU
  gpuTemp = ''; // Armazena a temperatura da GPU
  ramUso = ''; // Armazena o uso de RAM
  ramDisponivel = ''; // Armazena a RAM disponível
  discoUso = ''; // Armazena o uso do disco
  discoDisponivel = ''; // Armazena o espaço disponível no disco
  erros = ''; // Armazena mensagens de erro
  ip = 'Carregando...'; // Armazena o endereço IP do usuário

  private apiUrl = 'http://localhost:3000/upload'; //  URL da API

  // Injeta o serviço HttpClient no componente
  constructor(private http: HttpClient) {}

  // Método chamado automaticamente ao inicializar o componente
  ngOnInit(): void {
    this.carregarDados(); // Chama o método para carregar dados do backend
    this.getIPAddress(); // Chama o método para obter o endereço IP do usuário
  }

  // Método para carregar dados do backend
  carregarDados(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        // Preenche as propriedades com os dados recebidos
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





