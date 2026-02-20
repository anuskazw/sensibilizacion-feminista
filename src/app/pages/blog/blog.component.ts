import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';
import { OfflineService } from '../../core/services/offline.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { BlogArticle, BlogComment, CommentStatus } from '../../core/models/blog.model';
import { MultilingualText } from '../../core/models/content.model';
import { SkeletonScreenComponent } from '../../shared/components/skeleton-screen/skeleton-screen.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

/**
 * Componente de blog con listado de artículos y comentarios moderados
 * Implementa la funcionalidad de US-026
 */
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterLink,
    SkeletonScreenComponent,
    ErrorStateComponent
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  private languageService = inject(LanguageService);
  private translateService = inject(TranslateService);
  private offlineService = inject(OfflineService);
  private analyticsService = inject(AnalyticsService);
  private route = inject(ActivatedRoute);

  // Estados de carga y error
  isLoading = signal(false);
  hasError = signal(false);
  errorMessage = signal<string>('');

  // Artículo seleccionado (para vista de detalle)
  selectedArticle = signal<BlogArticle | null>(null);
  showArticleDetail = signal(false);

  // Datos de ejemplo de artículos del blog
  private sampleArticles: BlogArticle[] = [
    {
      id: '1',
      slug: 'feminismo-interseccional',
      titulo: this.createMultilingualText('Feminismo Interseccional: Más allá del género'),
      resumen: this.createMultilingualText('Exploramos cómo el feminismo interseccional reconoce las múltiples formas de discriminación que enfrentan las mujeres.'),
      contenido: this.createMultilingualText('El feminismo interseccional es un enfoque que reconoce que las mujeres experimentan opresión de múltiples formas, no solo por género, sino también por raza, clase, orientación sexual, discapacidad y otras identidades. Este artículo profundiza en los conceptos clave y su importancia en la lucha por la igualdad.'),
      contenido_lectura_facil: this.createMultilingualText('El feminismo interseccional dice que las mujeres pueden sufrir discriminación por varias razones. No solo por ser mujer, sino también por su color de piel, su clase social o su orientación sexual. Es importante entender todas estas formas de discriminación para luchar mejor por la igualdad.'),
      autor: 'María González',
      autor_bio: this.createMultilingualText('Activista feminista y escritora especializada en teoría interseccional.'),
      imagen_destacada: '/assets/images/blog/feminismo-interseccional.jpg',
      imagen_alt: this.createMultilingualText('Ilustración sobre feminismo interseccional'),
      categorias: [
        { id: '1', nombre: { es: 'Teoría', en: 'Theory', ca: 'Teoria', val: 'Teoria', gl: 'Teoría', eu: 'Teoria' }, slug: 'teoria', descripcion: 'Teoría feminista' },
        { id: '2', nombre: { es: 'Interseccionalidad', en: 'Intersectionality', ca: 'Interseccionalitat', val: 'Interseccionalitat', gl: 'Interseccionalidade', eu: 'Intersekzionalitatea' }, slug: 'interseccionalidad', descripcion: 'Interseccionalidad' }
      ],
      etiquetas: [
        { id: '1', nombre: { es: 'Feminismo', en: 'Feminism', ca: 'Feminisme', val: 'Feminisme', gl: 'Feminismo', eu: 'Feminismoa' }, slug: 'feminismo', descripcion: 'Feminismo' },
        { id: '2', nombre: { es: 'Igualdad', en: 'Equality', ca: 'Igualtat', val: 'Igualtat', gl: 'Igualdade', eu: 'Berdintasuna' }, slug: 'igualdad', descripcion: 'Igualdad' }
      ],
      comentarios_habilitados: true,
      comentarios: [],
      num_comentarios_aprobados: 0,
      activo: true,
      fecha_publicacion: new Date('2024-01-15'),
      fecha_modificacion: new Date('2024-01-15'),
      fecha_creacion: new Date('2024-01-10'),
      estado: 'publicado',
      vistas: 1250,
      likes: 89
    },
    {
      id: '2',
      slug: 'historia-movimiento-feminista',
      titulo: this.createMultilingualText('Historia del Movimiento Feminista en España'),
      resumen: this.createMultilingualText('Un recorrido por los hitos más importantes del movimiento feminista en España desde sus inicios hasta la actualidad.'),
      contenido: this.createMultilingualText('El movimiento feminista en España tiene una rica historia que se remonta al siglo XIX. Desde las primeras sufragistas hasta las manifestaciones actuales, este artículo recorre los momentos clave que han marcado la lucha por los derechos de las mujeres en nuestro país.'),
      contenido_lectura_facil: this.createMultilingualText('Las mujeres en España llevan muchos años luchando por sus derechos. Empezó en el siglo XIX cuando las mujeres querían votar. Desde entonces, han logrado muchas cosas importantes. Este artículo cuenta esa historia.'),
      autor: 'Ana Martínez',
      autor_bio: this.createMultilingualText('Historiadora especializada en historia de las mujeres y movimientos sociales.'),
      imagen_destacada: '/assets/images/blog/historia-feminismo.jpg',
      imagen_alt: this.createMultilingualText('Manifestación feminista histórica'),
      categorias: [
        { id: '3', nombre: { es: 'Historia', en: 'History', ca: 'Història', val: 'Història', gl: 'Historia', eu: 'Historia' }, slug: 'historia', descripcion: 'Historia del feminismo' }
      ],
      etiquetas: [
        { id: '1', nombre: { es: 'Feminismo', en: 'Feminism', ca: 'Feminisme', val: 'Feminisme', gl: 'Feminismo', eu: 'Feminismoa' }, slug: 'feminismo', descripcion: 'Feminismo' },
        { id: '3', nombre: { es: 'Historia', en: 'History', ca: 'Història', val: 'Història', gl: 'Historia', eu: 'Historia' }, slug: 'historia', descripcion: 'Historia' }
      ],
      comentarios_habilitados: true,
      comentarios: [],
      num_comentarios_aprobados: 0,
      activo: true,
      fecha_publicacion: new Date('2024-02-01'),
      fecha_modificacion: new Date('2024-02-01'),
      fecha_creacion: new Date('2024-01-25'),
      estado: 'publicado',
      vistas: 980,
      likes: 67
    },
    {
      id: '3',
      slug: 'violencia-machista-prevencion',
      titulo: this.createMultilingualText('Prevención de la Violencia Machista: Herramientas y Recursos'),
      resumen: this.createMultilingualText('Conoce las herramientas y recursos disponibles para prevenir y combatir la violencia machista en nuestra sociedad.'),
      contenido: this.createMultilingualText('La prevención de la violencia machista requiere de herramientas, recursos y conocimiento. En este artículo, exploramos las diferentes formas de prevenir la violencia de género, desde la educación hasta los recursos de apoyo disponibles para las víctimas.'),
      contenido_lectura_facil: this.createMultilingualText('La violencia machista es un problema grave. Hay formas de prevenirla y de ayudar a las víctimas. Este artículo explica qué podemos hacer y qué recursos hay disponibles.'),
      autor: 'Laura Sánchez',
      autor_bio: this.createMultilingualText('Psicóloga especializada en violencia de género y atención a víctimas.'),
      imagen_destacada: '/assets/images/blog/violencia-prevencion.jpg',
      imagen_alt: this.createMultilingualText('Recursos de prevención de violencia'),
      categorias: [
        { id: '4', nombre: { es: 'Violencia', en: 'Violence', ca: 'Violència', val: 'Violència', gl: 'Violencia', eu: 'Indarkeria' }, slug: 'violencia', descripcion: 'Violencia de género' },
        { id: '5', nombre: { es: 'Recursos', en: 'Resources', ca: 'Recursos', val: 'Recursos', gl: 'Recursos', eu: 'Baliabideak' }, slug: 'recursos', descripcion: 'Recursos de ayuda' }
      ],
      etiquetas: [
        { id: '4', nombre: { es: 'Violencia', en: 'Violence', ca: 'Violència', val: 'Violència', gl: 'Violencia', eu: 'Indarkeria' }, slug: 'violencia', descripcion: 'Violencia' },
        { id: '5', nombre: { es: 'Prevención', en: 'Prevention', ca: 'Prevenció', val: 'Prevenció', gl: 'Prevención', eu: 'Prebentzioa' }, slug: 'prevencion', descripcion: 'Prevención' }
      ],
      comentarios_habilitados: true,
      comentarios: [],
      num_comentarios_aprobados: 0,
      activo: true,
      fecha_publicacion: new Date('2024-02-15'),
      fecha_modificacion: new Date('2024-02-15'),
      fecha_creacion: new Date('2024-02-10'),
      estado: 'publicado',
      vistas: 1520,
      likes: 112
    }
  ];

  // Artículos filtrados y visibles
  articles = signal<BlogArticle[]>([]);

  // Artículos filtrados (por búsqueda, categoría, etc.)
  filteredArticles = computed(() => {
    return this.articles().filter(article => article.activo && article.estado === 'publicado');
  });

  // Comentarios del artículo seleccionado
  articleComments = signal<BlogComment[]>([]);
  newComment = signal<{ nombre: string; email: string; contenido: string }>({
    nombre: '',
    email: '',
    contenido: ''
  });
  isSubmittingComment = signal(false);

  ngOnInit(): void {
    // Verificar si hay un slug en la ruta para mostrar detalle
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        const article = this.sampleArticles.find(a => a.slug === slug);
        if (article) {
          this.selectArticle(article);
        }
      }
    });

    // Simular carga de datos
    // this.isLoading.set(true);
    this.hasError.set(false);

    setTimeout(() => {
      try {
        if (this.offlineService.isOffline()) {
          throw new Error('offline');
        }

        // Cargar artículos
        this.articles.set(this.sampleArticles);

        // Trackear vista de página de blog
        this.analyticsService.trackContentView('blog-page', 'blog', []);

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

  selectArticle(article: BlogArticle): void {
    this.selectedArticle.set(article);
    this.showArticleDetail.set(true);

    // Cargar comentarios aprobados del artículo
    this.loadArticleComments(article.id);

    // Trackear vista de artículo
    this.analyticsService.trackContentView(`blog-article-${article.id}`, 'blog-article', article.etiquetas.map(t => t.slug));
  }

  closeArticleDetail(): void {
    this.showArticleDetail.set(false);
    this.selectedArticle.set(null);
    this.articleComments.set([]);
  }

  loadArticleComments(articleId: string): void {
    // Simular carga de comentarios aprobados
    // En producción, esto vendría de un servicio
    const comments: BlogComment[] = [
      {
        id: '1',
        articulo_id: articleId,
        contenido: 'Excelente artículo, muy informativo. Gracias por compartir esta información.',
        autor_nombre: 'Carmen López',
        estado: 'aprobado',
        fecha_creacion: new Date('2024-01-20'),
        fecha_modificacion: new Date('2024-01-20'),
        fecha_aprobacion: new Date('2024-01-20')
      },
      {
        id: '2',
        articulo_id: articleId,
        contenido: 'Me ha ayudado mucho a entender mejor estos conceptos. ¿Hay más recursos disponibles?',
        autor_nombre: 'Sofía Martín',
        estado: 'aprobado',
        fecha_creacion: new Date('2024-01-22'),
        fecha_modificacion: new Date('2024-01-22'),
        fecha_aprobacion: new Date('2024-01-22')
      }
    ];

    this.articleComments.set(comments);
  }

  submitComment(): void {
    const comment = this.newComment();
    if (!comment.nombre.trim() || !comment.contenido.trim()) {
      return;
    }

    this.isSubmittingComment.set(true);

    // Simular envío de comentario (en producción, esto iría a un servicio)
    setTimeout(() => {
      const newComment: BlogComment = {
        id: Date.now().toString(),
        articulo_id: this.selectedArticle()!.id,
        contenido: comment.contenido,
        autor_nombre: comment.nombre,
        autor_email: comment.email || undefined,
        estado: 'pendiente', // Los comentarios requieren moderación
        fecha_creacion: new Date(),
        fecha_modificacion: new Date()
      };

      // En producción, el comentario se enviaría al servidor
      // Por ahora, solo mostramos un mensaje de éxito
      this.newComment.set({ nombre: '', email: '', contenido: '' });
      this.isSubmittingComment.set(false);

      // Mostrar mensaje de éxito (en producción, usar un servicio de notificaciones)
      alert(this.translateService.instant('blog.comment.submitted'));
    }, 1000);
  }

  getHashtagName(hashtag: any): string {
    const lang = this.languageService.getCurrentLanguage();
    return hashtag.nombre[lang as keyof MultilingualText] || hashtag.nombre.es;
  }

  getTitle(article: BlogArticle): string {
    const lang = this.languageService.getCurrentLanguage();
    return article.titulo[lang as keyof MultilingualText] || article.titulo.es;
  }

  getSummary(article: BlogArticle): string {
    const lang = this.languageService.getCurrentLanguage();
    return article.resumen[lang as keyof MultilingualText] || article.resumen.es;
  }

  getContent(article: BlogArticle): string {
    const lang = this.languageService.getCurrentLanguage();
    return article.contenido[lang as keyof MultilingualText] || article.contenido.es;
  }

  getEasyReadContent(article: BlogArticle): string {
    if (!article.contenido_lectura_facil) {
      return this.getContent(article);
    }
    const lang = this.languageService.getCurrentLanguage();
    return article.contenido_lectura_facil[lang as keyof MultilingualText] || article.contenido_lectura_facil.es;
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat(this.languageService.getCurrentLanguage(), {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
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

