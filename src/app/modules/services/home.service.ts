import { Injectable } from '@angular/core';
import { ListaService } from './lista.service';
import { PartidaService } from './partida.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private listaService: ListaService,
    private partidaService: PartidaService
  ) {}

  iniciarPartidaComTexto(texto: string, tamanhoEquipes: number) {
    return this.listaService
      .formatarLista(texto)
      .pipe(
        switchMap((jogadores) =>
          this.partidaService.iniciarPartida(jogadores, tamanhoEquipes)
        )
      );
  }

  formatarLista(texto: string) {
    return this.listaService.formatarLista(texto);
  }

  atualizarPartida(partida: any, equipePerdedora: string) {
    return this.partidaService.atualizarPartida(partida, equipePerdedora);
  }
}
