import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { 
  SignLanguageVideoPlayerComponent, 
  SignLanguageVideo 
} from '../../shared/components/sign-language-video-player/sign-language-video-player.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, SignLanguageVideoPlayerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Ejemplo de vídeo en lengua de signos
  exampleVideo: SignLanguageVideo = {
    lseUrl: 'https://example.com/video-lse.mp4',
    lscUrl: 'https://example.com/video-lsc.mp4',
    title: 'Introducción a la Web de Sensibilización Feminista',
    transcription: 'Esta es una web dedicada a la sensibilización feminista accesible para personas sordas. Aquí encontrarás contenidos sobre historia del feminismo, conceptos clave, información sobre violencia de género y recursos de ayuda. Todo el contenido está disponible en lengua de signos española (LSE) y lengua de signos catalana (LSC).',
    subtitlesUrl: 'https://example.com/subtitles-es.vtt'
  };

  // Ejemplo de vídeo con solo LSE
  exampleVideoLseOnly: SignLanguageVideo = {
    lseUrl: 'https://example.com/video-historia-lse.mp4',
    title: '¿Qué es el feminismo?',
    transcription: 'El feminismo es un movimiento social y político que busca la igualdad de derechos entre hombres y mujeres. Su historia se remonta a siglos atrás y ha evolucionado en diferentes olas con objetivos específicos en cada época.'
  };
}

