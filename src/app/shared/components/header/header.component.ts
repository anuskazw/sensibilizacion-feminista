import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService, Language } from '../../../core/services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  availableLanguages: Language[] = [];
  currentLanguage: string = '';
  isLanguageMenuOpen: boolean = false;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.availableLanguages = this.languageService.availableLanguages;
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  /**
   * Cambia el idioma de la aplicación
   */
  changeLanguage(langCode: string): void {
    this.languageService.setLanguage(langCode);
    this.currentLanguage = langCode;
    this.closeLanguageMenu();
  }

  /**
   * Abre/cierra el menú de idiomas
   */
  toggleLanguageMenu(): void {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  /**
   * Cierra el menú de idiomas
   */
  closeLanguageMenu(): void {
    this.isLanguageMenuOpen = false;
  }

  /**
   * Obtiene el nombre del idioma actual
   */
  getCurrentLanguageName(): string {
    return this.languageService.getCurrentLanguageName();
  }
}

