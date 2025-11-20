import { Component, OnInit, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavigationSidebarComponent } from './shared/components/navigation-sidebar/navigation-sidebar.component';
import { FooterComponent } from './shared/components/footer/footer';
import { LanguageService } from './core/services/language.service';
import { SidebarService } from './core/services/sidebar.service';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavigationSidebarComponent, FooterComponent],
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
  }
}
