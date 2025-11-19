/**
 * Pruebas unitarias para HashtagService
 * US-004 Ticket 03
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HashtagService } from './hashtag.service';
import { Hashtag } from '../models/content.model';

describe('HashtagService', () => {
  let service: HashtagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HashtagService]
    });
    service = TestBed.inject(HashtagService);
  });

  describe('Inicialización', () => {
    it('debería crear el servicio', () => {
      expect(service).toBeTruthy();
    });

    it('debería cargar hashtags iniciales', () => {
      const hashtags = service.getAllHashtags();
      expect(hashtags.length).toBeGreaterThan(0);
    });
  });

  describe('getAllHashtags()', () => {
    it('debería retornar todos los hashtags', () => {
      const hashtags = service.getAllHashtags();
      expect(Array.isArray(hashtags)).toBe(true);
      expect(hashtags.length).toBeGreaterThan(0);
    });
  });

  describe('getHashtagById()', () => {
    it('debería encontrar un hashtag por ID', () => {
      const hashtags = service.getAllHashtags();
      const firstId = hashtags[0].id;
      
      const found = service.getHashtagById(firstId);
      expect(found).toBeDefined();
      expect(found?.id).toBe(firstId);
    });
  });

  describe('getHashtagBySlug()', () => {
    it('debería encontrar un hashtag por slug', () => {
      const hashtags = service.getAllHashtags();
      const firstSlug = hashtags[0].slug;
      
      const found = service.getHashtagBySlug(firstSlug);
      expect(found).toBeDefined();
      expect(found?.slug).toBe(firstSlug);
    });
  });

  describe('searchHashtags()', () => {
    it('debería buscar por nombre', () => {
      const results = service.searchHashtags('fem');
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('addHashtag()', () => {
    it('debería añadir un nuevo hashtag', () => {
      const newHashtag: Hashtag = {
        id: 'test-new-1',
        nombre: 'Nuevo Tag',
        slug: 'nuevo-tag',
        descripcion: 'Descripción de prueba'
      };

      const initialCount = service.getAllHashtags().length;
      const added = service.addHashtag(newHashtag);
      
      expect(added).toBeDefined();
      expect(service.getAllHashtags().length).toBe(initialCount + 1);
    });
  });

  describe('updateHashtag()', () => {
    it('debería actualizar un hashtag existente', () => {
      const hashtags = service.getAllHashtags();
      const targetId = hashtags[0].id;
      
      const updated = service.updateHashtag(targetId, {
        nombre: 'Nombre Actualizado'
      });

      expect(updated).toBe(true);
    });
  });

  describe('deleteHashtag()', () => {
    it('debería eliminar un hashtag existente', () => {
      const hashtags = service.getAllHashtags();
      const targetId = hashtags[0].id;
      const initialCount = hashtags.length;
      
      const deleted = service.deleteHashtag(targetId);
      
      expect(deleted).toBe(true);
      expect(service.getAllHashtags().length).toBe(initialCount - 1);
    });
  });

  describe('getHashtagsGroupedByLetter()', () => {
    it('debería agrupar hashtags por primera letra', () => {
      const grouped = service.getHashtagsGroupedByLetter();
      
      expect(Array.isArray(grouped)).toBe(true);
      expect(grouped.length).toBeGreaterThan(0);
    });
  });

  describe('isValidSlug()', () => {
    it('debería validar slugs correctos', () => {
      expect(service.isValidSlug('feminismo')).toBe(true);
      expect(service.isValidSlug('violencia-de-genero')).toBe(true);
    });
  });

  describe('generateSlug()', () => {
    it('debería generar slug desde nombre', () => {
      expect(service.generateSlug('Feminismo')).toBe('feminismo');
      expect(service.generateSlug('Violencia de Género')).toBe('violencia-de-genero');
    });
  });

  describe('getStatistics()', () => {
    it('debería retornar estadísticas correctas', () => {
      const stats = service.getStatistics();
      
      expect(stats).toHaveProperty('total');
      expect(stats).toHaveProperty('withDescription');
      expect(stats).toHaveProperty('withoutDescription');
    });
  });
});
