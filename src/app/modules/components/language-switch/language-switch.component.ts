import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switch',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss',
})
export class LanguageSwitchComponent {
  @Input() language: string = 'en';
  @Output() languageChange = new EventEmitter<string>();
  isEnglish = this.language === 'en';

  toggleLanguage(): void {
    this.language = this.language === 'en' ? 'pt' : 'en';
    this.languageChange.emit(this.language);
    this.isEnglish = this.language === 'en';
  }
}
