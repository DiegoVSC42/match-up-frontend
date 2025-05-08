import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['pt', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
