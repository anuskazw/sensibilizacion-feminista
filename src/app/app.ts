import { Component, OnInit, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavigationSidebarComponent } from './shared/components/navigation-sidebar/navigation-sidebar.component';
import { FooterComponent } from './shared/components/footer/footer';
import { CookieBannerComponent } from './shared/components/cookie-banner/cookie-banner.component';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';
import { LanguageService } from './core/services/language.service';
import { SidebarService } from './core/services/sidebar.service';
import { SeoService } from './core/services/seo.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavigationSidebarComponent, FooterComponent, CookieBannerComponent, ScrollToTopComponent, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(
    private languageService: LanguageService,
    public sidebarService: SidebarService,
    private seoService: SeoService
  ) {
    // Efecto para añadir/quitar clase en el body cuando el sidebar cambia de estado
    effect(() => {
      const isCollapsed = this.sidebarService.isCollapsed();
      if (isCollapsed) {
        document.body.classList.add('sidebar-collapsed');
      } else {
        document.body.classList.remove('sidebar-collapsed');
      }
    });
  }

  ngOnInit(): void {
    // El servicio de idiomas ya se inicializa automáticamente en su constructor
    // Solo lo inyectamos aquí para asegurar que se crea al inicio de la aplicación
    
    // Manejar el evento de clic del skip-link para accesibilidad
    this.setupSkipLink();
  }

  /**
   * Configura el comportamiento del skip-link para accesibilidad
   */
  private setupSkipLink(): void {
    const skipLink = document.querySelector('.skip-link') as HTMLAnchorElement;
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }
}
