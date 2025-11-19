import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    // El servicio de idiomas ya se inicializa automáticamente en su constructor
    // Solo lo inyectamos aquí para asegurar que se crea al inicio de la aplicación
  }
}
