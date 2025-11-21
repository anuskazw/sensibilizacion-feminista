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
  isMobileMenuOpen: boolean = false;

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
   * Abre/cierra el menú móvil
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  /**
   * Cierra el menú móvil
   */
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  /**
   * Maneja eventos de teclado para navegación accesible en el menú de idiomas y menú móvil
   */
  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    // Manejar Escape para cerrar menús
    if (event.key === 'Escape') {
      if (this.isLanguageMenuOpen) {
        event.preventDefault();
        this.closeLanguageMenu();
        const languageButton = event.target as HTMLElement;
        const button = languageButton.closest('.language-selector')?.querySelector('.language-button') as HTMLElement;
        if (button) {
          button.focus();
        }
        return;
      }
      if (this.isMobileMenuOpen) {
        event.preventDefault();
        this.closeMobileMenu();
        return;
      }
    }

    // Manejar navegación en menú de idiomas
    if (!this.isLanguageMenuOpen) {
      return;
    }

    const languageOptionsArray = this.languageOptions?.toArray() || [];

    switch (event.key) {
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

  /**
   * Cierra el menú móvil cuando se hace clic fuera
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const headerElement = target.closest('.header');
    const mobileMenuButton = target.closest('.mobile-menu-button');
    
    if (this.isMobileMenuOpen && headerElement && !mobileMenuButton && !target.closest('.header-nav')) {
      this.closeMobileMenu();
    }
  }
}

