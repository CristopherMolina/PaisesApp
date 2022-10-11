import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais-interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html'
})
export class PorCapitalComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  capitalesSugeridas: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital(termino).subscribe((paises) => {
      this.paises = paises;
    },(err) => {
      this.hayError = true;
      this.paises = [];
    });
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarCapital(termino)
    .subscribe(
      paises => this.capitalesSugeridas = paises.splice(0,5),
      (err) => this.capitalesSugeridas = []
      );
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }
}