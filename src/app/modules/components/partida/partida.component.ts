import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../button/button.component';
import { EditPlayerModalComponent } from '../modals/edit-player-modal/edit-player-modal.component';
import { EquipeComponent } from '../equipe/equipe.component';

@Component({
  selector: 'app-partida',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    EditPlayerModalComponent,
    EquipeComponent,
  ],
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.scss'],
})
export class PartidaComponent {
  @Input() partida: any;

  jogadorSendoEditado: string | null = null;
  novoJogadorMode = false;

  // Método para adicionar novo jogador (adicionado)
  adicionarNovoJogador() {
    this.novoJogadorMode = true;
    this.jogadorSendoEditado = '';
  }

  editarJogador(jogador: string) {
    this.jogadorSendoEditado = jogador;
    this.novoJogadorMode = false;
  }

  excluirJogador(jogador: string) {
    const indexA = this.partida.equipeA.jogadores.indexOf(jogador);
    const indexB = this.partida.equipeB.jogadores.indexOf(jogador);

    if (
      (indexA !== -1 || indexB !== -1) &&
      this.partida.reserva.jogadores.length > 0
    ) {
      if (indexA !== -1) {
        this.partida.equipeA.jogadores.splice(indexA, 1);
        const substituto = this.partida.reserva.jogadores.shift();
        if (substituto) {
          this.partida.equipeA.jogadores.push(substituto);
        }
      } else if (indexB !== -1) {
        this.partida.equipeB.jogadores.splice(indexB, 1);
        const substituto = this.partida.reserva.jogadores.shift();
        if (substituto) {
          this.partida.equipeB.jogadores.push(substituto);
        }
      }
    } else {
      const remover = (lista: string[]) => {
        const index = lista.indexOf(jogador);
        if (index !== -1) lista.splice(index, 1);
      };

      remover(this.partida.equipeA.jogadores);
      remover(this.partida.equipeB.jogadores);
      remover(this.partida.reserva.jogadores);
    }
  }

  confirmarEdicao(novoNome: string) {
    if (novoNome.trim() === '') return;

    if (this.novoJogadorMode) {
      this.partida.reserva.jogadores.push(novoNome.trim());
    } else {
      if (!this.jogadorSendoEditado) return;

      const atualizar = (lista: string[]) => {
        const index = lista.indexOf(this.jogadorSendoEditado!);
        if (index !== -1) lista[index] = novoNome.trim();
      };

      atualizar(this.partida.equipeA.jogadores);
      atualizar(this.partida.equipeB.jogadores);
      atualizar(this.partida.reserva.jogadores);
    }

    this.jogadorSendoEditado = null;
    this.novoJogadorMode = false;
  }

  cancelarEdicao() {
    this.jogadorSendoEditado = null;
    this.novoJogadorMode = false;
  }
}
