import { Component, OnInit, HostListener, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
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
  focusedLanguageIndex: number = -1;

  @ViewChildren('languageOption') languageOptions!: QueryList<ElementRef<HTMLButtonElement>>;

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
    this.focusedLanguageIndex = -1;
  }

  /**
   * Abre/cierra el menú de idiomas
   */
  toggleLanguageMenu(): void {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
    if (this.isLanguageMenuOpen) {
      // Enfocar el primer elemento del menú cuando se abre
      setTimeout(() => {
        const firstOption = this.languageOptions?.first;
        if (firstOption) {
          firstOption.nativeElement.focus();
          this.focusedLanguageIndex = 0;
        }
      }, 0);
    } else {
      this.focusedLanguageIndex = -1;
    }
  }

  /**
   * Cierra el menú de idiomas
   */
  closeLanguageMenu(): void {
    this.isLanguageMenuOpen = false;
    this.focusedLanguageIndex = -1;
  }

  /**
   * Obtiene el nombre del idioma actual
   */
  getCurrentLanguageName(): string {
    return this.languageService.getCurrentLanguageName();
  }

  /**
   * Maneja eventos de teclado para navegación accesible en el menú de idiomas
   */
  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.isLanguageMenuOpen) {
      return;
    }

    const languageOptionsArray = this.languageOptions?.toArray() || [];
    
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.closeLanguageMenu();
        // Devolver el foco al botón que abrió el menú
        const languageButton = event.target as HTMLElement;
        const button = languageButton.closest('.language-selector')?.querySelector('.language-button') as HTMLElement;
        if (button) {
          button.focus();
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        this.focusedLanguageIndex = Math.min(
          this.focusedLanguageIndex + 1,
          languageOptionsArray.length - 1
        );
        languageOptionsArray[this.focusedLanguageIndex]?.nativeElement.focus();
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.focusedLanguageIndex = Math.max(this.focusedLanguageIndex - 1, 0);
        languageOptionsArray[this.focusedLanguageIndex]?.nativeElement.focus();
        break;

      case 'Home':
        event.preventDefault();
        this.focusedLanguageIndex = 0;
        languageOptionsArray[0]?.nativeElement.focus();
        break;

      case 'End':
        event.preventDefault();
        this.focusedLanguageIndex = languageOptionsArray.length - 1;
        languageOptionsArray[this.focusedLanguageIndex]?.nativeElement.focus();
        break;
    }
  }
}

