import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
})
export class ThemeSwitchComponent implements OnInit {
  isDarkMode = true;

  ngOnInit(): void {
    document.documentElement.classList.add('dark-theme');
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  toggleTheme(): void {
    this.toggleDarkMode();
    document.documentElement.classList.toggle('dark-theme', this.isDarkMode);
  }
}
