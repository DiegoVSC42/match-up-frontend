import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { ThemeSwitchComponent } from '../../components/theme-switch/theme-switch.component';
import { LanguageSwitchComponent } from '../../components/language-switch/language-switch.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ListaService } from '../../services/lista.service'; // Importe o serviço

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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isModalOpen = false;
  modalText = '';

  constructor(
    private translate: TranslateService,
    private listaService: ListaService // Injete o serviço
  ) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  currentLanguage = 'en';
  isEnglish = true;

  changeLanguage(language: string) {
    this.currentLanguage = language;
    this.translate.use(language);
    this.isEnglish = language === 'en';
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalText = '';
  }

  handleSubmit() {
    if (this.modalText.trim()) {
      this.listaService.formatarLista(this.modalText).subscribe({
        next: (response) => {
          console.log('Resposta do servidor:', response);
          this.closeModal();
        },
        error: (error) => {
          console.error('Erro ao formatar lista:', error);
        },
      });
    }
  }
}
