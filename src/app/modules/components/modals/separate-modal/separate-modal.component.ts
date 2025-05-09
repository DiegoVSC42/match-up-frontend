import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-separate-modal',
  standalone: true,
  imports: [TranslatePipe, CommonModule, FormsModule, ButtonComponent],
  templateUrl: './separate-modal.component.html',
  styleUrl: './separate-modal.component.scss',
})
export class SeparateModalComponent {
  @Output() confirmed = new EventEmitter<{
    quantidade: number;
    tipo: string;
  }>();
  @Output() canceled = new EventEmitter<void>();
  @Input() isOpen = false;
  quantidade = 1;
  tipoSeparacao = 'ALEATORIO';
  maxPlayers = 6;

  separationOptions = [
    {
      value: 'ALEATORIO',
      label: 'modal.random',
      description: 'modal.randomDescription',
    },
    {
      value: 'PRIMEIROS',
      label: 'modal.firstPlayers',
      description: 'modal.firstPlayersDescription',
    },
    {
      value: 'MEIO',
      label: 'modal.middlePlayers',
      description: 'modal.middlePlayersDescription',
    },
    {
      value: 'ULTIMOS',
      label: 'modal.lastPlayers',
      description: 'modal.lastPlayersDescription',
    },
    {
      value: 'EXTREMOS',
      label: 'modal.extremes',
      description: 'modal.extremesDescription',
    },
  ];

  isValid(): boolean {
    return this.quantidade > 0 && this.quantidade <= this.maxPlayers;
  }

  onConfirm() {
    if (this.isValid()) {
      this.confirmed.emit({
        quantidade: this.quantidade,
        tipo: this.tipoSeparacao.toUpperCase(), // Garante que será enviado em maiúsculas
      });
    }
  }

  onCancel() {
    this.canceled.emit();
  }
}
