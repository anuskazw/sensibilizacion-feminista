import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Componente de login para el panel de administración
 */
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class AdminLoginComponent {
  username = signal('');
  password = signal('');
  error = signal<string | null>(null);
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    const usernameValue = this.username();
    const passwordValue = this.password();

    if (!usernameValue || !passwordValue) {
      this.error.set('admin.login.error.required');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    // Intentar login
    const success = this.authService.login(usernameValue, passwordValue);

    if (success) {
      // Redirigir al panel de administración
      this.router.navigate(['/admin']);
    } else {
      this.error.set('admin.login.error.invalid');
      this.loading.set(false);
    }
  }
}

