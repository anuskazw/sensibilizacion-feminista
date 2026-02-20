/**
 * Servicio de gestión de hashtags
 * Implementa la gestión centralizada de hashtags según US-004
 */

import { Injectable, signal, computed, inject } from '@angular/core';
import { Hashtag, MultilingualText } from '../models/content.model';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class HashtagService {
  private languageService = inject(LanguageService);

  // Colección centralizada de hashtags
  private hashtags = signal<Hashtag[]>([]);

  // Hashtags ordenados alfabéticamente (computed)
  public sortedHashtags = computed(() => {
    return [...this.hashtags()].sort((a, b) =>
      this.getLocalizedName(a).localeCompare(this.getLocalizedName(b), 'es', { sensitivity: 'base' })
    );
  });

  // Map para búsqueda rápida por ID
  public hashtagsById = computed(() => {
    const map = new Map<string, Hashtag>();
    this.hashtags().forEach(tag => map.set(tag.id, tag));
    return map;
  });

  // Map para búsqueda rápida por slug
  public hashtagsBySlug = computed(() => {
    const map = new Map<string, Hashtag>();
    this.hashtags().forEach(tag => map.set(tag.slug, tag));
    return map;
  });

  constructor() {
    // Inicializar con datos de ejemplo/demo
    this.loadInitialHashtags();
  }

  /**
   * Obtiene el nombre localizado de un hashtag
   */
  getLocalizedName(hashtag: Hashtag): string {
    const lang = this.languageService.getCurrentLanguage();
    return hashtag.nombre[lang as keyof MultilingualText] || hashtag.nombre.es;
  }

  /**
   * Obtiene todos los hashtags
   */
  getAllHashtags(): Hashtag[] {
    return this.hashtags();
  }

  /**
   * Obtiene un hashtag por su ID
   */
  getHashtagById(id: string): Hashtag | undefined {
    return this.hashtagsById().get(id);
  }

  /**
   * Obtiene un hashtag por su slug
   */
  getHashtagBySlug(slug: string): Hashtag | undefined {
    return this.hashtagsBySlug().get(slug);
  }

  /**
   * Busca hashtags por texto (nombre o descripción)
   */
  searchHashtags(searchText: string): Hashtag[] {
    if (!searchText || searchText.trim().length === 0) {
      return this.sortedHashtags();
    }

    const search = searchText.toLowerCase().trim();
    return this.sortedHashtags().filter(tag =>
      this.getLocalizedName(tag).toLowerCase().includes(search) ||
      (tag.descripcion && tag.descripcion.toLowerCase().includes(search))
    );
  }

  /**
   * Añade un nuevo hashtag
   * @returns El hashtag añadido o undefined si ya existe
   */
  addHashtag(hashtag: Hashtag): Hashtag | undefined {
    // Verificar si ya existe por ID o slug
    if (this.hashtagsById().has(hashtag.id)) {
      console.warn(`Hashtag con id ${hashtag.id} ya existe`);
      return undefined;
    }

    if (this.hashtagsBySlug().has(hashtag.slug)) {
      console.warn(`Hashtag con slug ${hashtag.slug} ya existe`);
      return undefined;
    }

    // Añadir el nuevo hashtag
    this.hashtags.update(tags => [...tags, hashtag]);
    return hashtag;
  }

  /**
   * Actualiza un hashtag existente
   * @returns true si se actualizó, false si no existe
   */
  updateHashtag(id: string, updates: Partial<Omit<Hashtag, 'id'>>): boolean {
    const index = this.hashtags().findIndex(tag => tag.id === id);

    if (index === -1) {
      console.warn(`Hashtag con id ${id} no encontrado`);
      return false;
    }

    // Verificar que el nuevo slug no esté en uso (si se está actualizando)
    if (updates.slug) {
      const existingWithSlug = this.getHashtagBySlug(updates.slug);
      if (existingWithSlug && existingWithSlug.id !== id) {
        console.warn(`Slug ${updates.slug} ya está en uso por otro hashtag`);
        return false;
      }
    }

    this.hashtags.update(tags => {
      const newTags = [...tags];
      newTags[index] = { ...newTags[index], ...updates };
      return newTags;
    });

    return true;
  }

  /**
   * Elimina un hashtag por su ID
   * @returns true si se eliminó, false si no existe
   */
  deleteHashtag(id: string): boolean {
    const initialLength = this.hashtags().length;

    this.hashtags.update(tags => tags.filter(tag => tag.id !== id));

    const deleted = this.hashtags().length < initialLength;

    if (!deleted) {
      console.warn(`Hashtag con id ${id} no encontrado`);
    }

    return deleted;
  }

  /**
   * Obtiene hashtags agrupados por la primera letra
   */
  getHashtagsGroupedByLetter(): Array<{ letter: string; tags: Hashtag[] }> {
    const groups = new Map<string, Hashtag[]>();

    this.sortedHashtags().forEach(tag => {
      const firstLetter = this.getLocalizedName(tag).charAt(0).toUpperCase();
      if (!groups.has(firstLetter)) {
        groups.set(firstLetter, []);
      }
      groups.get(firstLetter)!.push(tag);
    });

    return Array.from(groups.entries())
      .sort(([a], [b]) => a.localeCompare(b, 'es'))
      .map(([letter, tags]) => ({ letter, tags }));
  }

  /**
   * Valida que un slug sea válido (solo letras minúsculas, números y guiones)
   */
  isValidSlug(slug: string): boolean {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  }

  /**
   * Genera un slug a partir de un nombre
   */
  generateSlug(nombre: string | MultilingualText): string {
    const text = typeof nombre === 'string' ? nombre : nombre.es;
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
      .replace(/[^a-z0-9]+/g, '-') // Reemplazar caracteres especiales por guiones
      .replace(/^-+|-+$/g, ''); // Eliminar guiones al inicio y final
  }

  /**
   * Verifica si un hashtag está siendo usado en contenidos
   * (Esta función debería integrarse con el servicio de contenidos)
   */
  isHashtagInUse(id: string): boolean {
    // TODO: Implementar verificación real cuando se integre con el servicio de contenidos
    // Por ahora retorna false para permitir eliminación
    return false;
  }

  /**
   * Carga hashtags iniciales para demo/desarrollo
   */
  private loadInitialHashtags(): void {
    const initialHashtags: Hashtag[] = [
      {
        id: 'ht-001',
        nombre: { es: 'Feminismo', en: 'Feminism', ca: 'Feminisme', val: 'Feminisme', gl: 'Feminismo', eu: 'Feminismoa' },
        slug: 'feminismo',
        descripcion: 'Movimiento social y político por la igualdad de género'
      },
      {
        id: 'ht-002',
        nombre: { es: 'Igualdad', en: 'Equality', ca: 'Igualtat', val: 'Igualtat', gl: 'Igualdade', eu: 'Berdintasuna' },
        slug: 'igualdad',
        descripcion: 'Igualdad de derechos y oportunidades'
      },
      {
        id: 'ht-003',
        nombre: { es: 'Violencia de Género', en: 'Gender Violence', ca: 'Violència de Gènere', val: 'Violència de Gènere', gl: 'Violencia de Xénero', eu: 'Genero Indarkeria' },
        slug: 'violencia-de-genero',
        descripcion: 'Violencia ejercida contra las mujeres por razón de género'
      },
      {
        id: 'ht-004',
        nombre: { es: 'Accesibilidad', en: 'Accessibility', ca: 'Accessibilitat', val: 'Accessibilitat', gl: 'Accesibilidade', eu: 'Irisgarritasuna' },
        slug: 'accesibilidad',
        descripcion: 'Accesibilidad para personas con discapacidad'
      },
      {
        id: 'ht-005',
        nombre: { es: 'Lengua de Signos', en: 'Sign Language', ca: 'Llengua de Signes', val: 'Llengua de Signes', gl: 'Lingua de Signos', eu: 'Zeinu Hizkuntza' },
        slug: 'lengua-de-signos',
        descripcion: 'Comunicación en lengua de signos'
      },
      {
        id: 'ht-006',
        nombre: { es: 'Educación', en: 'Education', ca: 'Educació', val: 'Educació', gl: 'Educación', eu: 'Hezkuntza' },
        slug: 'educacion',
        descripcion: 'Educación y sensibilización'
      },
      {
        id: 'ht-007',
        nombre: { es: 'Derechos Humanos', en: 'Human Rights', ca: 'Drets Humans', val: 'Drets Humans', gl: 'Dereitos Humanos', eu: 'Giza Eskubideak' },
        slug: 'derechos-humanos',
        descripcion: 'Derechos fundamentales de las personas'
      },
      {
        id: 'ht-008',
        nombre: { es: 'Empoderamiento', en: 'Empowerment', ca: 'Empoderament', val: 'Empoderament', gl: 'Empoderamento', eu: 'Ahalduntzea' },
        slug: 'empoderamiento',
        descripcion: 'Empoderamiento de la mujer'
      },
      {
        id: 'ht-009',
        nombre: { es: 'Discriminación', en: 'Discrimination', ca: 'Discriminació', val: 'Discriminació', gl: 'Discriminación', eu: 'Diskriminazioa' },
        slug: 'discriminacion',
        descripcion: 'Discriminación por razón de género o discapacidad'
      },
      {
        id: 'ht-010',
        nombre: { es: 'Sororidad', en: 'Sisterhood', ca: 'Sororitat', val: 'Sororitat', gl: 'Sororidade', eu: 'Ahizpatasuna' },
        slug: 'sororidad',
        descripcion: 'Solidaridad entre mujeres'
      }
    ];

    this.hashtags.set(initialHashtags);
  }

  /**
   * Carga hashtags desde una fuente de datos externa
   * (Para futuras integraciones con backend)
   */
  async loadHashtags(hashtags: Hashtag[]): Promise<void> {
    // Validar que todos los hashtags tengan datos correctos
    const validHashtags = hashtags.filter(tag =>
      tag.id &&
      tag.nombre?.es &&
      tag.slug &&
      this.isValidSlug(tag.slug)
    );

    if (validHashtags.length !== hashtags.length) {
      console.warn(`${hashtags.length - validHashtags.length} hashtags inválidos fueron omitidos`);
    }

    this.hashtags.set(validHashtags);
  }

  /**
   * Resetea los hashtags a los valores iniciales
   */
  resetToDefaults(): void {
    this.loadInitialHashtags();
  }

  /**
   * Limpia todos los hashtags
   */
  clearAll(): void {
    this.hashtags.set([]);
  }

  /**
   * Obtiene estadísticas de uso de hashtags
   */
  getStatistics(): {
    total: number;
    withDescription: number;
    withoutDescription: number;
  } {
    const all = this.hashtags();
    return {
      total: all.length,
      withDescription: all.filter(tag => tag.descripcion).length,
      withoutDescription: all.filter(tag => !tag.descripcion).length
    };
  }
}

