import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';
import { OfflineService } from '../../core/services/offline.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { AgendaEvent } from '../../core/models/event.model';
import { MultilingualText } from '../../core/models/content.model';
import { SkeletonScreenComponent } from '../../shared/components/skeleton-screen/skeleton-screen.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

/**
 * Componente de agenda con calendario de eventos
 * Implementa la funcionalidad de US-027
 */
@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SkeletonScreenComponent,
    ErrorStateComponent
  ],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent implements OnInit {
  private languageService = inject(LanguageService);
  private translateService = inject(TranslateService);
  private offlineService = inject(OfflineService);
  private analyticsService = inject(AnalyticsService);

  // Estados de carga y error
  isLoading = signal(false);
  hasError = signal(false);
  errorMessage = signal<string>('');

  // Mes y año actuales del calendario
  currentMonth = signal(new Date().getMonth());
  currentYear = signal(new Date().getFullYear());

  // Datos de ejemplo de eventos
  private sampleEvents: AgendaEvent[] = [
    {
      id: '1',
      slug: 'taller-feminismo-interseccional',
      titulo: this.createMultilingualText('Taller de Feminismo Interseccional'),
      descripcion: this.createMultilingualText('Taller práctico sobre feminismo interseccional y sus aplicaciones en la vida cotidiana.'),
      fecha: new Date('2025-09-15'),
      hora: '18:00',
      lugar: this.createMultilingualText('Centro Cultural Feminista'),
      direccion: this.createMultilingualText('Calle Principal, 123, Madrid'),
      video_signado: '/assets/videos/eventos/taller-feminismo-interseccional-lse.mp4',
      activo: true,
      fecha_creacion: new Date('2025-08-01'),
      fecha_modificacion: new Date('2025-08-01'),
      tipo: 'taller'
    },
    {
      id: '2',
      slug: 'manifestacion-8m',
      titulo: this.createMultilingualText('Manifestación 8 de Marzo'),
      descripcion: this.createMultilingualText('Manifestación por los derechos de las mujeres y la igualdad de género.'),
      fecha: new Date('2025-03-08'),
      hora: '12:00',
      lugar: this.createMultilingualText('Plaza Mayor'),
      direccion: this.createMultilingualText('Plaza Mayor, Madrid'),
      video_signado: '/assets/videos/eventos/manifestacion-8m-lse.mp4',
      activo: true,
      fecha_creacion: new Date('2025-02-01'),
      fecha_modificacion: new Date('2025-02-01'),
      tipo: 'manifestacion'
    },
    {
      id: '3',
      slug: 'conferencia-historia-feminismo',
      titulo: this.createMultilingualText('Conferencia: Historia del Feminismo en España'),
      descripcion: this.createMultilingualText('Conferencia sobre los hitos más importantes del movimiento feminista en España.'),
      fecha: new Date('2025-10-20'),
      hora: '19:30',
      lugar: this.createMultilingualText('Auditorio Municipal'),
      direccion: this.createMultilingualText('Avenida de la Cultura, 45, Barcelona'),
      video_signado: '/assets/videos/eventos/conferencia-historia-lse.mp4',
      activo: true,
      fecha_creacion: new Date('2025-09-01'),
      fecha_modificacion: new Date('2025-09-01'),
      tipo: 'conferencia'
    },
    {
      id: '4',
      slug: 'actividad-sororidad',
      titulo: this.createMultilingualText('Actividad: Círculo de Sororidad'),
      descripcion: this.createMultilingualText('Espacio de encuentro y apoyo mutuo entre mujeres.'),
      fecha: new Date('2025-09-25'),
      hora: '17:00',
      lugar: this.createMultilingualText('Espacio Feminista'),
      direccion: this.createMultilingualText('Calle de la Igualdad, 78, Valencia'),
      video_signado: '/assets/videos/eventos/actividad-sororidad-lse.mp4',
      activo: true,
      fecha_creacion: new Date('2025-08-15'),
      fecha_modificacion: new Date('2025-08-15'),
      tipo: 'actividad'
    }
  ];

  // Eventos filtrados por mes/año actual
  events = signal<AgendaEvent[]>([]);

  // Eventos filtrados y agrupados por fecha
  eventsByDate = computed(() => {
    const events = this.events().filter(e => e.activo);
    const grouped = new Map<string, AgendaEvent[]>();

    events.forEach(event => {
      const dateKey = this.getDateKey(event.fecha);
      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)!.push(event);
    });

    // Ordenar eventos dentro de cada fecha por hora
    grouped.forEach((eventList, dateKey) => {
      eventList.sort((a, b) => {
        if (a.hora && b.hora) {
          return a.hora.localeCompare(b.hora);
        }
        return 0;
      });
    });

    return grouped;
  });

  // Días del mes con eventos
  daysWithEvents = computed(() => {
    const days = new Set<number>();
    this.eventsByDate().forEach((events, dateKey) => {
      const date = new Date(dateKey);
      if (date.getMonth() === this.currentMonth() && date.getFullYear() === this.currentYear()) {
        days.add(date.getDate());
      }
    });
    return days;
  });

  ngOnInit(): void {
    // Simular carga de datos
    // this.isLoading.set(true);
    this.hasError.set(false);

    setTimeout(() => {
      try {
        if (this.offlineService.isOffline()) {
          throw new Error('offline');
        }

        // Filtrar eventos del mes/año actual y futuros
        const now = new Date();
        const filteredEvents = this.sampleEvents.filter(event => {
          const eventDate = new Date(event.fecha);
          eventDate.setHours(0, 0, 0, 0);
          const today = new Date(now);
          today.setHours(0, 0, 0, 0);
          return eventDate >= today;
        });

        this.events.set(filteredEvents);

        // Trackear vista de página de agenda
        this.analyticsService.trackContentView('agenda-page', 'blog', []);

        this.isLoading.set(false);
      } catch (error: any) {
        this.hasError.set(true);
        this.isLoading.set(false);
        if (error.message === 'offline') {
          this.errorMessage.set('error.offline');
        } else {
          this.errorMessage.set('error.generic');
        }
      }
    }, 0);
  }

  retryLoad(): void {
    this.ngOnInit();
  }

  getErrorSuggestions(): string[] {
    if (this.offlineService.isOffline()) {
      return [
        this.translateService.instant('error.suggestionsOffline.0'),
        this.translateService.instant('error.suggestionsOffline.1'),
        this.translateService.instant('error.suggestionsOffline.2')
      ];
    }
    return [
      this.translateService.instant('error.suggestionsNetwork.0'),
      this.translateService.instant('error.suggestionsNetwork.1'),
      this.translateService.instant('error.suggestionsNetwork.2')
    ];
  }

  // Navegación del calendario
  previousMonth(): void {
    if (this.currentMonth() === 0) {
      this.currentMonth.set(11);
      this.currentYear.set(this.currentYear() - 1);
    } else {
      this.currentMonth.set(this.currentMonth() - 1);
    }
  }

  nextMonth(): void {
    if (this.currentMonth() === 11) {
      this.currentMonth.set(0);
      this.currentYear.set(this.currentYear() + 1);
    } else {
      this.currentMonth.set(this.currentMonth() + 1);
    }
  }

  goToToday(): void {
    const today = new Date();
    this.currentMonth.set(today.getMonth());
    this.currentYear.set(today.getFullYear());
  }

  // Obtener nombre del mes
  getMonthName(): string {
    const date = new Date(this.currentYear(), this.currentMonth(), 1);
    return new Intl.DateTimeFormat(this.languageService.getCurrentLanguage(), {
      month: 'long',
      year: 'numeric'
    }).format(date);
  }

  // Obtener días del mes
  getDaysInMonth(): number[] {
    const daysInMonth = new Date(this.currentYear(), this.currentMonth() + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  // Obtener día de la semana del primer día del mes
  getFirstDayOfWeek(): number {
    const firstDay = new Date(this.currentYear(), this.currentMonth(), 1);
    return firstDay.getDay();
  }

  // Obtener eventos de un día específico
  getEventsForDay(day: number): AgendaEvent[] {
    const date = new Date(this.currentYear(), this.currentMonth(), day);
    const dateKey = this.getDateKey(date);
    return this.eventsByDate().get(dateKey) || [];
  }

  // Obtener clave de fecha para agrupar eventos
  private getDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Obtener Date desde una clave de fecha
  getDateFromKey(dateKey: string): Date {
    return new Date(dateKey);
  }

  // Obtener texto multiidioma
  getTitle(event: AgendaEvent): string {
    const lang = this.languageService.getCurrentLanguage();
    return event.titulo[lang as keyof MultilingualText] || event.titulo.es;
  }

  getDescription(event: AgendaEvent): string {
    const lang = this.languageService.getCurrentLanguage();
    return event.descripcion[lang as keyof MultilingualText] || event.descripcion.es;
  }

  getLugar(event: AgendaEvent): string {
    const lang = this.languageService.getCurrentLanguage();
    return event.lugar[lang as keyof MultilingualText] || event.lugar.es;
  }

  getDireccion(event: AgendaEvent): string {
    if (!event.direccion) return '';
    const lang = this.languageService.getCurrentLanguage();
    return event.direccion[lang as keyof MultilingualText] || event.direccion.es;
  }

  // Formatear fecha
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat(this.languageService.getCurrentLanguage(), {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  // Obtener nombre del día de la semana
  getDayName(dayIndex: number): string {
    const date = new Date(2024, 0, dayIndex + 1); // Usar un año fijo para obtener nombres consistentes
    return new Intl.DateTimeFormat(this.languageService.getCurrentLanguage(), {
      weekday: 'short'
    }).format(date);
  }

  // Verificar si un día es hoy
  isToday(day: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      this.currentMonth() === today.getMonth() &&
      this.currentYear() === today.getFullYear()
    );
  }

  // Obtener fechas de eventos ordenadas
  getSortedEventDates(): Array<{ dateKey: string; events: AgendaEvent[] }> {
    const eventsMap = this.eventsByDate();
    return Array.from(eventsMap.entries())
      .map(([dateKey, events]) => ({ dateKey, events }))
      .sort((a, b) => a.dateKey.localeCompare(b.dateKey));
  }

  private createMultilingualText(text: string): MultilingualText {
    return {
      es: text,
      en: text,
      ca: text,
      val: text,
      gl: text,
      eu: text
    };
  }
}

