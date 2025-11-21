import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { Content, ContentStatus, ContentType } from '../../core/models/content.model';
import { LanguageService } from '../../core/services/language.service';

/**
 * Panel de administración de contenidos
 * Implementa US-019 con flujo de estados: Borrador -> Revisado -> Publicado
 */
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  authService = inject(AuthService);  // Público para usar en el template
  private router = inject(Router);
  private languageService = inject(LanguageService);
  private translateService = inject(TranslateService);

  // Filtros
  selectedStatus = signal<ContentStatus | 'todos'>('todos');
  selectedType = signal<ContentType | 'todos'>('todos');
  searchQuery = signal('');

  // Datos de ejemplo (en producción vendrían de un servicio/API)
  private contents = signal<Content[]>([]);

  // Contenidos filtrados
  filteredContents = computed(() => {
    let result = this.contents();

    // Filtrar por estado
    if (this.selectedStatus() !== 'todos') {
      result = result.filter(c => c.estado === this.selectedStatus());
    }

    // Filtrar por tipo
    if (this.selectedType() !== 'todos') {
      result = result.filter(c => c.tipo === this.selectedType());
    }

    // Filtrar por búsqueda
    const query = this.searchQuery().toLowerCase();
    if (query) {
      result = result.filter(c => {
        const lang = this.languageService.getCurrentLanguage();
        const titulo = c.titulo[lang as keyof typeof c.titulo] || c.titulo.es;
        return titulo.toLowerCase().includes(query);
      });
    }

    return result;
  });

  // Estadísticas
  stats = computed(() => {
    const contents = this.contents();
    return {
      total: contents.length,
      borrador: contents.filter(c => c.estado === 'borrador').length,
      revisado: contents.filter(c => c.estado === 'revisado').length,
      publicado: contents.filter(c => c.estado === 'publicado').length
    };
  });

  // Opciones de estados y tipos
  statusOptions: Array<{ value: ContentStatus | 'todos'; label: string }> = [
    { value: 'todos', label: 'admin.status.all' },
    { value: 'borrador', label: 'admin.status.draft' },
    { value: 'revisado', label: 'admin.status.reviewed' },
    { value: 'publicado', label: 'admin.status.published' }
  ];

  typeOptions: Array<{ value: ContentType | 'todos'; label: string }> = [
    { value: 'todos', label: 'admin.type.all' },
    { value: 'historia', label: 'admin.type.historia' },
    { value: 'concepto', label: 'admin.type.concepto' },
    { value: 'violencia', label: 'admin.type.violencia' },
    { value: 'recurso', label: 'admin.type.recurso' },
    { value: 'testimonio', label: 'admin.type.testimonio' },
    { value: 'institucion', label: 'admin.type.institucion' }
  ];

  ngOnInit(): void {
    // Verificar autenticación
    if (!this.authService.checkAuth()) {
      this.router.navigate(['/admin/login']);
      return;
    }

    // Cargar contenidos de ejemplo
    this.loadSampleContents();
  }

  /**
   * Carga contenidos de ejemplo para demostración
   * En producción, esto vendría de un servicio HTTP
   */
  private loadSampleContents(): void {
    const sampleContents: Content[] = [
      {
        id: '1',
        slug: 'patriarcado',
        tipo: 'concepto',
        titulo: { es: 'Patriarcado', en: 'Patriarchy', ca: 'Patriarcat' },
        descripcion: { es: 'Sistema de organización social...', en: 'Social organization system...', ca: 'Sistema d\'organització social...' },
        descripcion_lectura_facil: { es: 'El patriarcado es cuando...', en: 'Patriarchy is when...', ca: 'El patriarcat és quan...' },
        hashtags: [],
        activo: true,
        fecha_publicacion: new Date('2024-01-15'),
        estado: 'publicado',
        fecha_creacion: new Date('2024-01-10'),
        fecha_modificacion: new Date('2024-01-15')
      },
      {
        id: '2',
        slug: 'feminismo-historia',
        tipo: 'historia',
        titulo: { es: 'Historia del Feminismo', en: 'History of Feminism', ca: 'Història del Feminisme' },
        descripcion: { es: 'El movimiento feminista...', en: 'The feminist movement...', ca: 'El moviment feminista...' },
        descripcion_lectura_facil: { es: 'El feminismo empezó...', en: 'Feminism started...', ca: 'El feminisme va començar...' },
        hashtags: [],
        activo: true,
        fecha_publicacion: new Date('2024-02-01'),
        anio: 1848,
        estado: 'revisado',
        fecha_creacion: new Date('2024-01-25'),
        fecha_modificacion: new Date('2024-01-30')
      },
      {
        id: '3',
        slug: 'violencia-domestica',
        tipo: 'violencia',
        titulo: { es: 'Violencia Doméstica', en: 'Domestic Violence', ca: 'Violència Domèstica' },
        descripcion: { es: 'La violencia doméstica es...', en: 'Domestic violence is...', ca: 'La violència domèstica és...' },
        descripcion_lectura_facil: { es: 'La violencia doméstica...', en: 'Domestic violence...', ca: 'La violència domèstica...' },
        hashtags: [],
        activo: false,
        fecha_publicacion: new Date('2024-03-01'),
        estado: 'borrador',
        fecha_creacion: new Date('2024-02-20'),
        fecha_modificacion: new Date('2024-02-25')
      }
    ];

    this.contents.set(sampleContents);
  }

  /**
   * Cambia el estado de un contenido siguiendo el flujo: Borrador -> Revisado -> Publicado
   */
  changeStatus(content: Content, newStatus: ContentStatus): void {
    const currentStatus = content.estado;
    
    // Validar transición de estados
    if (currentStatus === 'borrador' && newStatus === 'publicado') {
      // No se puede pasar directamente de borrador a publicado
      alert(this.translateService.instant('admin.error.invalidTransition'));
      return;
    }

    if (currentStatus === 'revisado' && newStatus === 'borrador') {
      // No se puede volver atrás de revisado a borrador
      alert(this.translateService.instant('admin.error.cannotGoBack'));
      return;
    }

    if (currentStatus === 'publicado' && newStatus !== 'publicado') {
      // No se puede cambiar el estado de un contenido publicado
      alert(this.translateService.instant('admin.error.cannotChangePublished'));
      return;
    }

    // Actualizar contenido
    const updatedContents = this.contents().map(c => {
      if (c.id === content.id) {
        return {
          ...c,
          estado: newStatus,
          fecha_modificacion: new Date(),
          modificado_por: this.authService.getCurrentUser() || undefined
        };
      }
      return c;
    });

    this.contents.set(updatedContents);
  }

  /**
   * Obtiene el título del contenido en el idioma actual
   */
  getContentTitle(content: Content): string {
    const lang = this.languageService.getCurrentLanguage();
    return content.titulo[lang as keyof typeof content.titulo] || content.titulo.es;
  }

  /**
   * Obtiene la etiqueta del estado traducida
   */
  getStatusLabel(status: ContentStatus): string {
    const labels: Record<ContentStatus, string> = {
      borrador: 'admin.status.draft',
      revisado: 'admin.status.reviewed',
      publicado: 'admin.status.published'
    };
    return labels[status];
  }

  /**
   * Obtiene la clase CSS para el estado
   */
  getStatusClass(status: ContentStatus): string {
    return `status-${status}`;
  }

  /**
   * Obtiene los estados disponibles para cambiar desde el estado actual
   */
  getAvailableTransitions(currentStatus: ContentStatus): ContentStatus[] {
    switch (currentStatus) {
      case 'borrador':
        return ['revisado'];
      case 'revisado':
        return ['publicado'];
      case 'publicado':
        return []; // No se puede cambiar
      default:
        return [];
    }
  }

  /**
   * Cierra sesión
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }

  /**
   * Formatea una fecha para mostrar
   */
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}

