import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Página de ayuda con referencias a teléfonos y entidades
 * Implementa la funcionalidad de US-032
 */
@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent {
  // Teléfonos de ayuda
  telephones = [
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
    },
    {
      id: '900116016',
      name: '900 116 016',
      number: '900 116 016',
      description: 'Teléfono de atención a personas con discapacidad',
      available: 'Lunes a viernes, 9:00-21:00',
      free: true
    }
  ];

  // Entidades de ayuda en temas de accesibilidad
  accessibilityEntities = [
    {
      id: 'cnse',
      name: 'CNSE',
      fullName: 'Confederación Estatal de Personas Sordas',
      description: 'Organización que defiende los derechos de las personas sordas',
      website: 'https://www.cnse.es',
      contact: 'info@cnse.es'
    },
    {
      id: 'fiapas',
      name: 'FIAPAS',
      fullName: 'Confederación Española de Familias de Personas Sordas',
      description: 'Organización de apoyo a familias con personas sordas',
      website: 'https://www.fiapas.es',
      contact: 'info@fiapas.es'
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
  feminismEntities = [
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
}

