import { Component } from '@angular/core';

@Component({
  selector: 'app-home-forms',
  templateUrl: './home-forms.component.html',
  styleUrls: ['./home-forms.component.css'],  // Continua referenciando o CSS do componente
})
export class HomeFormsComponent {
  // Dados simulados, você pode alterar conforme necessário
  cpuUso: string = '35%';
  cpuTemp: string = '65°C';
  gpuUso: string = '50%';
  gpuTemp: string = '70°C';
  ramUso: string = '8GB';
  ramDisponivel: string = '4GB';
  discoUso: string = '60%';
  discoDisponivel: string = '100GB';
  erros: string = 'Nenhum erro detectado.';

  // Método de simulação de exportação
  exportCSV(): void {
    console.log('Exportando CSV...');
    // Aqui você pode implementar a lógica de exportação de dados para CSV.
    // Esta é uma simulação e não interage com a API ou com os dados reais.
  }
}





