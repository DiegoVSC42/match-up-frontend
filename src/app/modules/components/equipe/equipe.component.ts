import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ButtonComponent],
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss'],
})
export class EquipeComponent {
  @Input() titulo: string = '';
  @Input() jogadores: string[] = [];
  @Input() tipo: 'principal' | 'reserva' = 'principal';

  @Output() editPlayer = new EventEmitter<string>();
  @Output() deletePlayer = new EventEmitter<string>();
  @Output() addPlayer = new EventEmitter<void>();

  editarJogador(jogador: string) {
    this.editPlayer.emit(jogador);
  }

  excluirJogador(jogador: string) {
    this.deletePlayer.emit(jogador);
  }

  adicionarNovoJogador() {
    this.addPlayer.emit();
  }
}
