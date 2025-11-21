import { Component, OnInit, effect, computed } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavigationSidebarComponent } from './shared/components/navigation-sidebar/navigation-sidebar.component';
import { FooterComponent } from './shared/components/footer/footer';
import { CookieBannerComponent } from './shared/components/cookie-banner/cookie-banner.component';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';
import { LanguageService } from './core/services/language.service';
import { SidebarService } from './core/services/sidebar.service';
import { SeoService } from './core/services/seo.service';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavigationSidebarComponent, FooterComponent, CookieBannerComponent, ScrollToTopComponent, TranslateModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  isAdminRoute = false;

  constructor(
    private languageService: LanguageService,
    public sidebarService: SidebarService,
    private seoService: SeoService,
    private router: Router
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

    // Detectar cambios de ruta para ocultar header/sidebar en admin
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isAdminRoute = event.url.startsWith('/admin');
        // Agregar/quitar clase al body para estilos globales
        if (this.isAdminRoute) {
          document.body.classList.add('admin-route');
        } else {
          document.body.classList.remove('admin-route');
        }
      });
  }

  ngOnInit(): void {
    // El servicio de idiomas ya se inicializa automáticamente en su constructor
    // Solo lo inyectamos aquí para asegurar que se crea al inicio de la aplicación
    
    // Verificar ruta inicial
    this.isAdminRoute = this.router.url.startsWith('/admin');
    if (this.isAdminRoute) {
      document.body.classList.add('admin-route');
    }
    
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
