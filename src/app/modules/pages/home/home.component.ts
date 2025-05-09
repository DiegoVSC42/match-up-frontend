import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeSwitchComponent } from '../../components/theme-switch/theme-switch.component';
import { LanguageSwitchComponent } from '../../components/language-switch/language-switch.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { HomeService } from '../../services/home.service';
import { LanguageService } from '../../services/language.service';
import { PartidaComponent } from '../../components/partida/partida.component';
import { ResultModalComponent } from '../../components/modals/result-modal/result-modal.component';
import { ModalComponent } from '../../components/modals/modal/modal.component';
import { SeparateModalComponent } from '../../components/modals/separate-modal/separate-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    ThemeSwitchComponent,
    LanguageSwitchComponent,
    FooterComponent,
    ButtonComponent,
    PartidaComponent,
    ModalComponent,
    ResultModalComponent,
    SeparateModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  currentLanguage = 'en';
  partida: any = null;
  isModalOpen = false;
  isResultModalOpen = false;
  modalMode: 'create' | 'add' | 'remove' = 'create';

  constructor(
    private homeService: HomeService,
    private languageService: LanguageService
  ) {}

  changeLanguage(language: string) {
    this.currentLanguage = language;
    this.languageService.changeLanguage(language);
  }

  openModal(mode: 'create' | 'add' | 'remove' = 'create') {
    this.modalMode = mode;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getModalTitle(): string {
    switch (this.modalMode) {
      case 'add':
        return 'modal.addPlayersTitle';
      case 'remove':
        return 'modal.removePlayersTitle';
      default:
        return 'modal.createTitle';
    }
  }

  getSubmitText(): string {
    switch (this.modalMode) {
      case 'add':
        return 'modal.addButton';
      case 'remove':
        return 'modal.removeButton';
      default:
        return 'modal.createButton';
    }
  }

  isSeparateModalOpen = false;

  separarJogadores() {
    this.isSeparateModalOpen = true;
    console.log('Modal aberto:', this.isSeparateModalOpen); // Debug
  }

  handleSeparateConfirm(data: { quantidade: number; tipo: string }) {
    console.log('Dados recebidos:', data); // Debug
    this.isSeparateModalOpen = false;

    this.homeService
      .separarJogadores(data.quantidade, data.tipo.toUpperCase(), this.partida) // Garante maiúsculas
      .subscribe({
        next: (novaPartida) => {
          this.partida = novaPartida;
        },
        error: (error) => {
          console.error('Erro ao separar jogadores:', error);
        },
      });
  }

  handleSeparateCancel() {
    this.isSeparateModalOpen = false;
  }
  handleSubmit(data: { text: string; teamSize?: number }) {
    this.homeService.formatarLista(data.text).subscribe({
      next: (jogadores) => {
        if (this.modalMode === 'remove') {
          this.removerJogadores(jogadores);
        } else {
          this.adicionarJogadores(jogadores, data.teamSize || 0);
        }
        this.closeModal();
      },
      error: (error) => {
        console.error('Erro:', error);
      },
    });
  }

  private adicionarJogadores(jogadores: string[], teamSize: number) {
    if (this.modalMode === 'create') {
      this.homeService
        .iniciarPartidaComTexto(jogadores.join('\n'), teamSize)
        .subscribe((partida) => (this.partida = partida));
    }
  }

  private removerJogadores(jogadores: string[]) {
    this.partida.reserva.jogadores = this.partida.reserva.jogadores.filter(
      (j: string) => !jogadores.includes(j)
    );
  }

  openResultModal() {
    this.isResultModalOpen = true;
  }

  closeResultModal() {
    this.isResultModalOpen = false;
  }

  handleResultSubmit(losingTeam: string) {
    this.homeService.atualizarPartida(this.partida, losingTeam).subscribe({
      next: (partidaAtualizada) => {
        this.partida = partidaAtualizada;
        this.closeResultModal();
      },
      error: (error) => {
        console.error('Erro ao atualizar partida:', error);
      },
    });
  }
}
