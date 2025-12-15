/**
 * Datos estáticos para la página de ayuda
 * Implementa la funcionalidad de US-032
 */

// Interfaces para tipado
export interface Telephone {
  id: string;
  name: string;
  number: string;
  description: string;
  available: string;
  free: boolean;
}

export interface Entity {
  id: string;
  name: string;
  fullName: string;
  description: string;
  website: string;
  contact: string;
}

// Teléfonos de ayuda
export const telephones: Telephone[] = [
  {
    id: '016',
    name: '016',
    number: '016',
    description: 'Teléfono contra la violencia de género',
    available: '24 horas, todos los días',
    free: true
  },
  {
    id: '112',
    name: '112',
    number: '112',
    description: 'Emergencias',
    available: '24 horas, todos los días',
    free: true
  }
];

// Entidades de ayuda en temas de accesibilidad
export const accessibilityEntities: Entity[] = [
  {
    id: 'cnse',
    name: 'CNSE',
    fullName: 'Confederación Estatal de Personas Sordas',
    description: 'Organización que defiende los derechos de las personas sordas',
    website: 'https://www.cnse.es',
    contact: 'info@cnse.es'
  },
  {
    id: 'cermi',
    name: 'CERMI',
    fullName: 'Comité Español de Representantes de Personas con Discapacidad',
    description: 'Organización que representa a las personas con discapacidad',
    website: 'https://www.cermi.es',
    contact: 'cermi@cermi.es'
  }
];

// Entidades de ayuda en temas de feminismo
export const feminismEntities: Entity[] = [
  {
    id: 'instituto-mujer',
    name: 'Instituto de la Mujer',
    fullName: 'Instituto de la Mujer y para la Igualdad de Oportunidades',
    description: 'Organismo público que promueve la igualdad entre mujeres y hombres',
    website: 'https://www.inmujeres.gob.es',
    contact: 'informacion@inmujeres.es'
  },
  {
    id: 'federacion-mujeres',
    name: 'Federación de Mujeres Progresistas',
    fullName: 'Federación de Mujeres Progresistas',
    description: 'Organización feminista que lucha por la igualdad de género',
    website: 'https://www.fmujeresprogresistas.org',
    contact: 'info@fmujeresprogresistas.org'
  },
  {
    id: 'red-feminista',
    name: 'Red Feminista',
    fullName: 'Red Estatal de Organizaciones Feministas',
    description: 'Red de organizaciones que trabajan por los derechos de las mujeres',
    website: 'https://www.redfeminista.org',
    contact: 'contacto@redfeminista.org'
  }
];
