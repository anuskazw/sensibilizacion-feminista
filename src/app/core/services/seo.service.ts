import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';
import { filter } from 'rxjs/operators';
import { RouteSEOConfig, PageMetaTags } from '../models/seo.model';

/**
 * Servicio para gestionar SEO: meta tags, hreflang, Open Graph, etc.
 * Implementa los requisitos de US-015
 */
@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private router = inject(Router);
  private translateService = inject(TranslateService);
  private languageService = inject(LanguageService);

  // URL base de la aplicación (debería configurarse según el entorno)
  private readonly baseUrl = 'https://example.com'; // TODO: Configurar según entorno

  // Configuración SEO por ruta
  private readonly routeSeoConfig: RouteSEOConfig[] = [
    {
      route: '',
      metaTags: {
        es: {
          title: 'Web de Sensibilización Feminista Accesible para Personas Sordas',
          description: 'Web de sensibilización feminista accesible para personas sordas. Información sobre historia, conceptos y recursos del feminismo con vídeos en lengua de signos.',
          keywords: 'feminismo, sensibilización, accesibilidad, lengua de signos, LSE, LSC, igualdad',
          ogTitle: 'Web de Sensibilización Feminista Accesible',
          ogDescription: 'Información sobre feminismo accesible para personas sordas con vídeos en lengua de signos',
          ogType: 'website'
        },
        en: {
          title: 'Accessible Feminist Awareness Web for Deaf People',
          description: 'Accessible feminist awareness web for deaf people. Information about history, concepts and resources of feminism with sign language videos.',
          keywords: 'feminism, awareness, accessibility, sign language, equality',
          ogTitle: 'Accessible Feminist Awareness Web',
          ogDescription: 'Information about feminism accessible for deaf people with sign language videos',
          ogType: 'website'
        },
        ca: {
          title: 'Web de Sensibilització Feminista Accessible per a Persones Sordes',
          description: 'Web de sensibilització feminista accessible per a persones sordes. Informació sobre història, conceptes i recursos del feminisme amb vídeos en llengua de signes.',
          keywords: 'feminisme, sensibilització, accessibilitat, llengua de signes, LSC, igualtat',
          ogTitle: 'Web de Sensibilització Feminista Accessible',
          ogDescription: 'Informació sobre feminisme accessible per a persones sordes amb vídeos en llengua de signes',
          ogType: 'website'
        },
        val: {
          title: 'Web de Sensibilització Feminista Accessible per a Persones Sordes',
          description: 'Web de sensibilització feminista accessible per a persones sordes. Informació sobre història, conceptes i recursos del feminisme amb vídeos en llengua de signes.',
          keywords: 'feminisme, sensibilització, accessibilitat, llengua de signes, LSC, igualtat',
          ogTitle: 'Web de Sensibilització Feminista Accessible',
          ogDescription: 'Informació sobre feminisme accessible per a persones sordes amb vídeos en llengua de signes',
          ogType: 'website'
        },
        gl: {
          title: 'Web de Sensibilización Feminista Accesible para Persoas Xordas',
          description: 'Web de sensibilización feminista accesible para persoas xordas. Información sobre historia, conceptos e recursos do feminismo con vídeos en lingua de signos.',
          keywords: 'feminismo, sensibilización, accesibilidade, lingua de signos, igualdade',
          ogTitle: 'Web de Sensibilización Feminista Accesible',
          ogDescription: 'Información sobre feminismo accesible para persoas xordas con vídeos en lingua de signos',
          ogType: 'website'
        },
        eu: {
          title: 'Feminismo Sentsibilizazio Web Gertaera Entzuteko Pertsonentzat',
          description: 'Feminismo sentsibilizazio web gertaera entzuteko pertsonentzat. Feminismoaren historia, kontzeptuak eta baliabideei buruzko informazioa zeinu hizkuntzako bideoekin.',
          keywords: 'feminismoa, sentsibilizazioa, irisgarritasuna, zeinu hizkuntza, berdintasuna',
          ogTitle: 'Feminismo Sentsibilizazio Web Irisgarria',
          ogDescription: 'Entzuteko pertsonentzat irisgarria den feminismoari buruzko informazioa zeinu hizkuntzako bideoekin',
          ogType: 'website'
        }
      }
    },
    {
      route: 'historia',
      metaTags: {
        es: {
          title: 'Historia del Feminismo - Web de Sensibilización Feminista',
          description: 'Descubre hechos, personas y grupos históricos del feminismo. Contenido accesible con vídeos en lengua de signos.',
          keywords: 'historia feminismo, sufragismo, Clara Campoamor, derechos mujeres',
          ogTitle: 'Historia del Feminismo',
          ogDescription: 'Descubre hechos, personas y grupos históricos del feminismo',
          ogType: 'website'
        },
        en: {
          title: 'History of Feminism - Feminist Awareness Web',
          description: 'Discover facts, people and historical groups of feminism. Accessible content with sign language videos.',
          keywords: 'feminism history, suffragism, women rights',
          ogTitle: 'History of Feminism',
          ogDescription: 'Discover facts, people and historical groups of feminism',
          ogType: 'website'
        },
        ca: {
          title: 'Història del Feminisme - Web de Sensibilització Feminista',
          description: 'Descobreix fets, persones i grups històrics del feminisme. Contingut accessible amb vídeos en llengua de signes.',
          keywords: 'història feminisme, sufragisme, Clara Campoamor, drets dones',
          ogTitle: 'Història del Feminisme',
          ogDescription: 'Descobreix fets, persones i grups històrics del feminisme',
          ogType: 'website'
        },
        val: {
          title: 'Història del Feminisme - Web de Sensibilització Feminista',
          description: 'Descobreix fets, persones i grups històrics del feminisme. Contingut accessible amb vídeos en llengua de signes.',
          keywords: 'història feminisme, sufragisme, Clara Campoamor, drets dones',
          ogTitle: 'Història del Feminisme',
          ogDescription: 'Descobreix fets, persones i grups històrics del feminisme',
          ogType: 'website'
        },
        gl: {
          title: 'Historia do Feminismo - Web de Sensibilización Feminista',
          description: 'Descobre feitos, persoas e grupos históricos do feminismo. Contido accesible con vídeos en lingua de signos.',
          keywords: 'historia feminismo, sufraxismo, dereitos mulleres',
          ogTitle: 'Historia do Feminismo',
          ogDescription: 'Descobre feitos, persoas e grupos históricos do feminismo',
          ogType: 'website'
        },
        eu: {
          title: 'Feminismoaren Historia - Feminismo Sentsibilizazio Web',
          description: 'Aurkitu feminismoaren gertakariak, pertsona eta talde historikoak. Eduki irisgarria zeinu hizkuntzako bideoekin.',
          keywords: 'feminismoaren historia, sufragismoa, emakumeen eskubideak',
          ogTitle: 'Feminismoaren Historia',
          ogDescription: 'Aurkitu feminismoaren gertakariak, pertsona eta talde historikoak',
          ogType: 'website'
        }
      }
    },
    {
      route: 'conceptos',
      metaTags: {
        es: {
          title: 'Conceptos del Feminismo - Web de Sensibilización Feminista',
          description: 'Aprende sobre los conceptos clave del feminismo. Contenido accesible con vídeos en lengua de signos.',
          keywords: 'conceptos feminismo, patriarcado, género, igualdad, empoderamiento',
          ogTitle: 'Conceptos del Feminismo',
          ogDescription: 'Aprende sobre los conceptos clave del feminismo',
          ogType: 'website'
        },
        en: {
          title: 'Feminist Concepts - Feminist Awareness Web',
          description: 'Learn about key concepts of feminism. Accessible content with sign language videos.',
          keywords: 'feminist concepts, patriarchy, gender, equality, empowerment',
          ogTitle: 'Feminist Concepts',
          ogDescription: 'Learn about key concepts of feminism',
          ogType: 'website'
        },
        ca: {
          title: 'Conceptes del Feminisme - Web de Sensibilització Feminista',
          description: 'Aprèn sobre els conceptes clau del feminisme. Contingut accessible amb vídeos en llengua de signes.',
          keywords: 'conceptes feminisme, patriarcat, gènere, igualtat, empoderament',
          ogTitle: 'Conceptes del Feminisme',
          ogDescription: 'Aprèn sobre els conceptes clau del feminisme',
          ogType: 'website'
        },
        val: {
          title: 'Conceptes del Feminisme - Web de Sensibilització Feminista',
          description: 'Aprèn sobre els conceptes clau del feminisme. Contingut accessible amb vídeos en llengua de signes.',
          keywords: 'conceptes feminisme, patriarcat, gènere, igualtat, empoderament',
          ogTitle: 'Conceptes del Feminisme',
          ogDescription: 'Aprèn sobre els conceptes clau del feminisme',
          ogType: 'website'
        },
        gl: {
          title: 'Conceptos do Feminismo - Web de Sensibilización Feminista',
          description: 'Aprende sobre os conceptos clave do feminismo. Contido accesible con vídeos en lingua de signos.',
          keywords: 'conceptos feminismo, patriarcado, xénero, igualdade, empoderamento',
          ogTitle: 'Conceptos do Feminismo',
          ogDescription: 'Aprende sobre os conceptos clave do feminismo',
          ogType: 'website'
        },
        eu: {
          title: 'Feminismoaren Kontzeptuak - Feminismo Sentsibilizazio Web',
          description: 'Ikasi feminismoaren kontzeptu garrantzitsuenak. Eduki irisgarria zeinu hizkuntzako bideoekin.',
          keywords: 'feminismoaren kontzeptuak, patriarkatua, generoa, berdintasuna, ahalduntzea',
          ogTitle: 'Feminismoaren Kontzeptuak',
          ogDescription: 'Ikasi feminismoaren kontzeptu garrantzitsuenak',
          ogType: 'website'
        }
      }
    },
    {
      route: 'violencia',
      metaTags: {
        es: {
          title: 'Violencia de Género - Web de Sensibilización Feminista',
          description: 'Información sobre tipos de violencia y señales de alerta. Recursos de ayuda y teléfonos de emergencia.',
          keywords: 'violencia género, violencia doméstica, recursos ayuda, teléfono 016',
          ogTitle: 'Violencia de Género',
          ogDescription: 'Información sobre tipos de violencia y señales de alerta',
          ogType: 'website'
        },
        en: {
          title: 'Gender Violence - Feminist Awareness Web',
          description: 'Information about types of violence and warning signs. Help resources and emergency phone numbers.',
          keywords: 'gender violence, domestic violence, help resources, emergency',
          ogTitle: 'Gender Violence',
          ogDescription: 'Information about types of violence and warning signs',
          ogType: 'website'
        },
        ca: {
          title: 'Violència de Gènere - Web de Sensibilització Feminista',
          description: 'Informació sobre tipus de violència i senyals d\'alerta. Recursos d\'ajuda i telèfons d\'emergència.',
          keywords: 'violència gènere, violència domèstica, recursos ajuda, telèfon 016',
          ogTitle: 'Violència de Gènere',
          ogDescription: 'Informació sobre tipus de violència i senyals d\'alerta',
          ogType: 'website'
        },
        val: {
          title: 'Violència de Gènere - Web de Sensibilització Feminista',
          description: 'Informació sobre tipus de violència i senyals d\'alerta. Recursos d\'ajuda i telèfons d\'emergència.',
          keywords: 'violència gènere, violència domèstica, recursos ajuda, telèfon 016',
          ogTitle: 'Violència de Gènere',
          ogDescription: 'Informació sobre tipus de violència i senyals d\'alerta',
          ogType: 'website'
        },
        gl: {
          title: 'Violencia de Xénero - Web de Sensibilización Feminista',
          description: 'Información sobre tipos de violencia e sinais de alerta. Recursos de axuda e teléfonos de emerxencia.',
          keywords: 'violencia xénero, violencia doméstica, recursos axuda, teléfono 016',
          ogTitle: 'Violencia de Xénero',
          ogDescription: 'Información sobre tipos de violencia e sinais de alerta',
          ogType: 'website'
        },
        eu: {
          title: 'Genero Indarkeria - Feminismo Sentsibilizazio Web',
          description: 'Indarkeria moten eta alerta seinaleen inguruko informazioa. Laguntza baliabideak eta larrialdi telefonoak.',
          keywords: 'genero indarkeria, etxeko indarkeria, laguntza baliabideak, 016 telefonoa',
          ogTitle: 'Genero Indarkeria',
          ogDescription: 'Indarkeria moten eta alerta seinaleen inguruko informazioa',
          ogType: 'website'
        }
      }
    },
    {
      route: 'recursos',
      metaTags: {
        es: {
          title: 'Recursos Feministas - Web de Sensibilización Feminista',
          description: 'Libros, películas y documentales recomendados sobre feminismo. Contenido accesible con vídeos en lengua de signos.',
          keywords: 'recursos feminismo, libros feministas, películas feministas, documentales',
          ogTitle: 'Recursos Feministas',
          ogDescription: 'Libros, películas y documentales recomendados sobre feminismo',
          ogType: 'website'
        },
        en: {
          title: 'Feminist Resources - Feminist Awareness Web',
          description: 'Recommended books, films and documentaries about feminism. Accessible content with sign language videos.',
          keywords: 'feminist resources, feminist books, feminist films, documentaries',
          ogTitle: 'Feminist Resources',
          ogDescription: 'Recommended books, films and documentaries about feminism',
          ogType: 'website'
        },
        ca: {
          title: 'Recursos Feministes - Web de Sensibilització Feminista',
          description: 'Llibres, pel·lícules i documentals recomanats sobre feminisme. Contingut accessible amb vídeos en llengua de signes.',
          keywords: 'recursos feminisme, llibres feministes, pel·lícules feministes, documentals',
          ogTitle: 'Recursos Feministes',
          ogDescription: 'Llibres, pel·lícules i documentals recomanats sobre feminisme',
          ogType: 'website'
        },
        val: {
          title: 'Recursos Feministes - Web de Sensibilització Feminista',
          description: 'Llibres, pel·lícules i documentals recomanats sobre feminisme. Contingut accessible amb vídeos en llengua de signes.',
          keywords: 'recursos feminisme, llibres feministes, pel·lícules feministes, documentals',
          ogTitle: 'Recursos Feministes',
          ogDescription: 'Llibres, pel·lícules i documentals recomanats sobre feminisme',
          ogType: 'website'
        },
        gl: {
          title: 'Recursos Feministas - Web de Sensibilización Feminista',
          description: 'Libros, películas e documentais recomendados sobre feminismo. Contido accesible con vídeos en lingua de signos.',
          keywords: 'recursos feminismo, libros feministas, películas feministas, documentais',
          ogTitle: 'Recursos Feministas',
          ogDescription: 'Libros, películas e documentais recomendados sobre feminismo',
          ogType: 'website'
        },
        eu: {
          title: 'Feminismo Baliabideak - Feminismo Sentsibilizazio Web',
          description: 'Feminismoari buruzko liburu, film eta dokumental gomendatuak. Eduki irisgarria zeinu hizkuntzako bideoekin.',
          keywords: 'feminismo baliabideak, feminismo liburuak, feminismo filmak, dokumentalak',
          ogTitle: 'Feminismo Baliabideak',
          ogDescription: 'Feminismoari buruzko liburu, film eta dokumental gomendatuak',
          ogType: 'website'
        }
      }
    },
    {
      route: 'recursos-ayuda',
      metaTags: {
        es: {
          title: 'Recursos de Ayuda - Web de Sensibilización Feminista',
          description: 'Testimonios e instituciones de apoyo. Encuentra ayuda y recursos especializados.',
          keywords: 'recursos ayuda, testimonios, instituciones apoyo, ayuda mujeres',
          ogTitle: 'Recursos de Ayuda',
          ogDescription: 'Testimonios e instituciones de apoyo',
          ogType: 'website'
        },
        en: {
          title: 'Help Resources - Feminist Awareness Web',
          description: 'Testimonials and support institutions. Find help and specialized resources.',
          keywords: 'help resources, testimonials, support institutions, women help',
          ogTitle: 'Help Resources',
          ogDescription: 'Testimonials and support institutions',
          ogType: 'website'
        },
        ca: {
          title: 'Recursos d\'Ajuda - Web de Sensibilització Feminista',
          description: 'Testimonis i institucions de suport. Troba ajuda i recursos especialitzats.',
          keywords: 'recursos ajuda, testimonis, institucions suport, ajuda dones',
          ogTitle: 'Recursos d\'Ajuda',
          ogDescription: 'Testimonis i institucions de suport',
          ogType: 'website'
        },
        val: {
          title: 'Recursos d\'Ajuda - Web de Sensibilització Feminista',
          description: 'Testimonis i institucions de suport. Troba ajuda i recursos especialitzats.',
          keywords: 'recursos ajuda, testimonis, institucions suport, ajuda dones',
          ogTitle: 'Recursos d\'Ajuda',
          ogDescription: 'Testimonis i institucions de suport',
          ogType: 'website'
        },
        gl: {
          title: 'Recursos de Axuda - Web de Sensibilización Feminista',
          description: 'Testemuños e institucións de apoio. Atopa axuda e recursos especializados.',
          keywords: 'recursos axuda, testemuños, institucións apoio, axuda mulleres',
          ogTitle: 'Recursos de Axuda',
          ogDescription: 'Testemuños e institucións de apoio',
          ogType: 'website'
        },
        eu: {
          title: 'Laguntza Baliabideak - Feminismo Sentsibilizazio Web',
          description: 'Testigantzak eta laguntza erakundeak. Aurkitu laguntza eta baliabide espezializatuak.',
          keywords: 'laguntza baliabideak, testigantzak, laguntza erakundeak, emakume laguntza',
          ogTitle: 'Laguntza Baliabideak',
          ogDescription: 'Testigantzak eta laguntza erakundeak',
          ogType: 'website'
        }
      }
    }
  ];

  constructor() {
    // Escuchar cambios de ruta para actualizar meta tags
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateMetaTags();
      });

    // Escuchar cambios de idioma para actualizar meta tags
    this.translateService.onLangChange.subscribe(() => {
      this.updateMetaTags();
    });

    // Actualizar meta tags inicialmente después de que el router esté listo
    setTimeout(() => {
      this.updateMetaTags();
    }, 0);
  }

  /**
   * Actualiza los meta tags según la ruta actual y el idioma
   */
  private updateMetaTags(): void {
    const currentRoute = this.router.url.replace('/', '') || '';
    const currentLang = this.languageService.getCurrentLanguage();
    
    const config = this.routeSeoConfig.find(c => c.route === currentRoute);
    
    if (config && config.metaTags[currentLang]) {
      this.setMetaTags(config.metaTags[currentLang], currentRoute, currentLang);
    } else {
      // Usar configuración por defecto (home)
      const defaultConfig = this.routeSeoConfig.find(c => c.route === '');
      if (defaultConfig && defaultConfig.metaTags[currentLang]) {
        this.setMetaTags(defaultConfig.metaTags[currentLang], '', currentLang);
      }
    }
  }

  /**
   * Establece los meta tags en el documento
   */
  private setMetaTags(metaTags: PageMetaTags, route: string, currentLang: string): void {
    // Title
    this.title.setTitle(metaTags.title);

    // Meta description
    this.updateOrCreateMetaTag('description', metaTags.description);

    // Meta keywords (si está definido)
    if (metaTags.keywords) {
      this.updateOrCreateMetaTag('keywords', metaTags.keywords);
    }

    // Open Graph tags
    const ogTitle = metaTags.ogTitle || metaTags.title;
    const ogDescription = metaTags.ogDescription || metaTags.description;
    const ogUrl = this.getPageUrl(route, currentLang);
    const ogImage = metaTags.ogImage || `${this.baseUrl}/assets/og-image.jpg`;
    const ogType = metaTags.ogType || 'website';

    this.updateOrCreateMetaTag('og:title', ogTitle, 'property');
    this.updateOrCreateMetaTag('og:description', ogDescription, 'property');
    this.updateOrCreateMetaTag('og:url', ogUrl, 'property');
    this.updateOrCreateMetaTag('og:image', ogImage, 'property');
    this.updateOrCreateMetaTag('og:type', ogType, 'property');
    this.updateOrCreateMetaTag('og:locale', this.getLocale(currentLang), 'property');

    // Etiquetas hreflang para todos los idiomas soportados
    this.setHreflangTags(route);

    // Actualizar el atributo lang del HTML
    document.documentElement.lang = currentLang;
  }

  /**
   * Establece las etiquetas hreflang para todos los idiomas soportados
   */
  private setHreflangTags(route: string): void {
    const languages = this.languageService.availableLanguages;
    
    // Eliminar hreflang existentes
    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach(link => link.remove());

    // Crear nuevas etiquetas hreflang
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang.code);
      link.setAttribute('href', this.getPageUrl(route, lang.code));
      document.head.appendChild(link);
    });

    // Agregar hreflang x-default (opcional, pero recomendado)
    const defaultLink = document.createElement('link');
    defaultLink.setAttribute('rel', 'alternate');
    defaultLink.setAttribute('hreflang', 'x-default');
    defaultLink.setAttribute('href', this.getPageUrl(route, 'es'));
    document.head.appendChild(defaultLink);
  }

  /**
   * Actualiza o crea un meta tag
   */
  private updateOrCreateMetaTag(name: string, content: string, attr: string = 'name'): void {
    const selector = attr === 'property' ? `property="${name}"` : `name="${name}"`;
    let metaTag = this.meta.getTag(selector);

    if (metaTag) {
      this.meta.updateTag({ [attr]: name, content });
    } else {
      this.meta.addTag({ [attr]: name, content });
    }
  }

  /**
   * Obtiene la URL completa de una página
   */
  private getPageUrl(route: string, lang: string): string {
    const path = route ? `/${route}` : '';
    return `${this.baseUrl}${path}`;
  }

  /**
   * Convierte el código de idioma a locale para Open Graph
   */
  private getLocale(lang: string): string {
    const localeMap: { [key: string]: string } = {
      'es': 'es_ES',
      'en': 'en_US',
      'ca': 'ca_ES',
      'val': 'ca_ES', // Valenciano usa el mismo locale que catalán
      'gl': 'gl_ES',
      'eu': 'eu_ES'
    };
    return localeMap[lang] || 'es_ES';
  }

  /**
   * Método público para actualizar meta tags manualmente (útil para componentes)
   */
  public updatePageMetaTags(metaTags: PageMetaTags, route?: string): void {
    const currentRoute = route || this.router.url.replace('/', '') || '';
    const currentLang = this.languageService.getCurrentLanguage();
    this.setMetaTags(metaTags, currentRoute, currentLang);
  }
}

