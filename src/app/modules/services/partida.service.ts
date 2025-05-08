import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartidaService {
  private API = `${environment.matchupApi}/partida`;

  constructor(private http: HttpClient) {}

  iniciarPartida(jogadores: string[], tamanhoEquipes: number) {
    const body = {
      tamanhoEquipes,
      jogadores,
    };
    return this.http.post(`${this.API}/iniciar`, body);
  }

  atualizarPartida(partida: any, equipePerdedora: string) {
    const payload = {
      equipePerdedora,
      partida: {
        equipeA: {
          tamanho: partida.equipeA.jogadores.length,
          jogadores: partida.equipeA.jogadores,
        },
        equipeB: {
          tamanho: partida.equipeB.jogadores.length,
          jogadores: partida.equipeB.jogadores,
        },
        reserva: {
          tamanho: partida.reserva.jogadores.length,
          jogadores: partida.reserva.jogadores,
        },
      },
    };
    return this.http.put(`${this.API}/atualizar`, payload);
  }
}
