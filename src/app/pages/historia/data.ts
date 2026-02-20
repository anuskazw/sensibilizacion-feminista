import { HistoriaContent, Hashtag, MultilingualText } from '../../core/models/content.model';

/**
 * Función helper para crear textos multilingües
 */
function createMultilingualText(text: string): MultilingualText {
  return {
    es: text,
    en: text, // En producción, aquí irían las traducciones reales
    ca: text,
    val: text,
    gl: text,
    eu: text
  };
}

/**
 * Hashtags de ejemplo para la página de historia
 */
export const sampleHashtags: Hashtag[] = [
  { id: '1', nombre: { es: 'Sufragismo', en: 'Suffragism', ca: 'Sufragisme', val: 'Sufragisme', gl: 'Sufraxismo', eu: 'Sufragismoa' }, slug: 'sufragismo', descripcion: 'Movimiento por el voto femenino' },
  { id: '2', nombre: { es: 'Igualdad', en: 'Equality', ca: 'Igualtat', val: 'Igualtat', gl: 'Igualdade', eu: 'Berdintasuna' }, slug: 'igualdad' },
  { id: '3', nombre: { es: 'Feminismo', en: 'Feminism', ca: 'Feminisme', val: 'Feminisme', gl: 'Feminismo', eu: 'Feminismoa' }, slug: 'feminismo' },
  { id: '4', nombre: { es: 'Derechos', en: 'Rights', ca: 'Drets', val: 'Drets', gl: 'Dereitos', eu: 'Eskubideak' }, slug: 'derechos' },
  { id: '5', nombre: { es: 'Activismo', en: 'Activism', ca: 'Activisme', val: 'Activisme', gl: 'Activismo', eu: 'Aktibismoa' }, slug: 'activismo' },
  { id: '6', nombre: { es: 'Historia', en: 'History', ca: 'Història', val: 'Història', gl: 'Historia', eu: 'Historia' }, slug: 'historia' },
  { id: '7', nombre: { es: 'Pioneras', en: 'Pioneers', ca: 'Pioneres', val: 'Pioneres', gl: 'Pioneiras', eu: 'Aitzindariak' }, slug: 'pioneras' },
  { id: '8', nombre: { es: 'Movimiento', en: 'Movement', ca: 'Moviment', val: 'Moviment', gl: 'Movemento', eu: 'Mugimendua' }, slug: 'movimiento' },
];

/**
 * Contenidos de ejemplo para la página de historia
 */
export const sampleContents: HistoriaContent[] = [
  {
    id: '1',
    slug: 'sufragio-femenino-espana',
    tipo: 'historia',
    titulo: {
      es: 'Sufragio femenino en España (1931)',
      en: 'Women\'s suffrage in Spain (1931)',
      ca: 'Sufragi femení a Espanya (1931)',
      val: 'Sufragi femení a Espanya (1931)',
      gl: 'Sufraxio feminino en España (1931)',
      eu: 'Emakumeen sufragioa Espainian (1931)'
    },
    descripcion: {
      es: 'El derecho al voto de las mujeres en España se aprobó en 1931 durante la Segunda República.',
      en: 'Women\'s right to vote in Spain was approved in 1931 during the Second Republic.',
      ca: 'El dret al vot de les dones a Espanya es va aprovar el 1931 durant la Segona República.',
      val: 'El dret al vot de les dones a Espanya es va aprovar el 1931 durant la Segona República.',
      gl: 'O dereito ao voto das mulleres en España aprobouse en 1931 durante a Segunda República.',
      eu: 'Emakumeen botoa Espainian 1931n onartu zen Bigarren Errepublikaren garaian.'
    },
    descripcion_lectura_facil: {
      es: 'En 1931 las mujeres españolas consiguieron el derecho a votar. Fue un logro muy importante.',
      en: 'In 1931, Spanish women gained the right to vote. It was a very important achievement.',
      ca: 'El 1931 les dones espanyoles van aconseguir el dret a votar. Va ser un assoliment molt important.',
      val: 'El 1931 les dones espanyoles van aconseguir el dret a votar. Va ser un assoliment molt important.',
      gl: 'En 1931 as mulleres españolas conseguiron o dereito a votar. Foi un logro moi importante.',
      eu: '1931n emakume espainiarrek bozkatzeko eskubidea lortu zuten. Lorpen oso garrantzitsua zen.'
    },
    hashtags: [sampleHashtags[0], sampleHashtags[3], sampleHashtags[5]],
    anio: 1931,
    activo: true,
    fecha_publicacion: new Date('2024-01-15'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-01-10'),
    fecha_modificacion: new Date('2024-01-15'),
    video_lse_url: 'https://youtu.be/BcX2-sbMtqI?si=55FrsjEWERYPvlxf',
    video_transcription: createMultilingualText('En este vídeo se explica la historia del sufragio femenino en España, un logro histórico conseguido en 1931 durante la Segunda República.'),
    referencias: [
      { titulo: 'Historia del sufragismo en España', autor: 'María Martínez', anio: 2010 }
    ]
  },
  {
    id: '2',
    slug: 'clara-campoamor',
    tipo: 'historia',
    titulo: {
      es: 'Clara Campoamor',
      en: 'Clara Campoamor',
      ca: 'Clara Campoamor',
      val: 'Clara Campoamor',
      gl: 'Clara Campoamor',
      eu: 'Clara Campoamor'
    },
    descripcion: {
      es: 'Clara Campoamor fue una política y activista española que luchó por el derecho al voto femenino.',
      en: 'Clara Campoamor was a Spanish politician and activist who fought for women\'s right to vote.',
      ca: 'Clara Campoamor va ser una política i activista espanyola que va lluitar pel dret al vot femení.',
      val: 'Clara Campoamor va ser una política i activista espanyola que va lluitar pel dret al vot femení.',
      gl: 'Clara Campoamor foi unha política e activista española que loitou polo dereito ao voto feminino.',
      eu: 'Clara Campoamor emakumeen botoa eskuratzearen alde borrokatu zen politikari eta aktibista espainiarra zen.'
    },
    descripcion_lectura_facil: {
      es: 'Clara Campoamor luchó para que las mujeres pudieran votar. Gracias a ella conseguimos este derecho.',
      en: 'Clara Campoamor fought for women to be able to vote. Thanks to her we gained this right.',
      ca: 'Clara Campoamor va lluitar perquè les dones poguessin votar. Gràcies a ella vam aconseguir aquest dret.',
      val: 'Clara Campoamor va lluitar perquè les dones poguessen votar. Gràcies a ella vam aconseguir aquest dret.',
      gl: 'Clara Campoamor loitou para que as mulleres puidesen votar. Grazas a ela conseguimos este dereito.',
      eu: 'Clara Campoamor emakumeek bozka eman ahal izateko borrokatu zen. Berari esker eskubide hau lortu genuen.'
    },
    hashtags: [sampleHashtags[0], sampleHashtags[6], sampleHashtags[4]],
    anio: 1931,
    activo: true,
    fecha_publicacion: new Date('2024-01-20'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-01-15'),
    fecha_modificacion: new Date('2024-01-20'),
    video_lse_url: 'https://example.com/videos/clara-campoamor-lse.mp4',
    video_transcription: createMultilingualText('Este vídeo cuenta la vida y obra de Clara Campoamor, una de las principales defensoras del sufragio femenino en España.')
  },
  {
    id: '3',
    slug: 'olympe-de-gouges',
    tipo: 'historia',
    titulo: {
      es: 'Olympe de Gouges',
      en: 'Olympe de Gouges',
      ca: 'Olympe de Gouges',
      val: 'Olympe de Gouges',
      gl: 'Olympe de Gouges',
      eu: 'Olympe de Gouges'
    },
    descripcion: {
      es: 'Olympe de Gouges escribió la Declaración de los Derechos de la Mujer y la Ciudadana en 1791.',
      en: 'Olympe de Gouges wrote the Declaration of the Rights of Woman and the Female Citizen in 1791.',
      ca: 'Olympe de Gouges va escriure la Declaració dels Drets de la Dona i la Ciutadana el 1791.',
      val: 'Olympe de Gouges va escriure la Declaració dels Drets de la Dona i la Ciutadana el 1791.',
      gl: 'Olympe de Gouges escribiu a Declaración dos Dereitos da Muller e da Cidadá en 1791.',
      eu: 'Olympe de Gouges-ek 1791n Emakumearen eta Herritarraren Eskubideen Aldarrikapena idatzi zuen.'
    },
    descripcion_lectura_facil: {
      es: 'En 1791, Olympe de Gouges escribió sobre los derechos de las mujeres. Fue muy valiente.',
      en: 'In 1791, Olympe de Gouges wrote about women\'s rights. She was very brave.',
      ca: 'El 1791, Olympe de Gouges va escriure sobre els drets de les dones. Va ser molt valenta.',
      val: 'El 1791, Olympe de Gouges va escriure sobre els drets de les dones. Va ser molt valenta.',
      gl: 'En 1791, Olympe de Gouges escribiu sobre os dereitos das mulleres. Foi moi valente.',
      eu: '1791n Olympe de Gouges-ek emakumeen eskubideei buruz idatzi zuen. Oso ausarta izan zen.'
    },
    hashtags: [sampleHashtags[3], sampleHashtags[6], sampleHashtags[5]],
    anio: 1791,
    activo: true,
    fecha_publicacion: new Date('2024-02-01'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-01-25'),
    fecha_modificacion: new Date('2024-02-01'),
    video_lse_url: 'https://example.com/videos/olympe-de-gouges-lse.mp4',
    video_transcription: createMultilingualText('Vídeo sobre Olympe de Gouges y su Declaración de los Derechos de la Mujer y la Ciudadana, un documento histórico fundamental para el feminismo.')
  },
  {
    id: '4',
    slug: 'dia-internacional-mujer',
    tipo: 'historia',
    titulo: {
      es: 'Día Internacional de la Mujer (1975)',
      en: 'International Women\'s Day (1975)',
      ca: 'Dia Internacional de la Dona (1975)',
      val: 'Dia Internacional de la Dona (1975)',
      gl: 'Día Internacional da Muller (1975)',
      eu: 'Emakumeen Nazioarteko Eguna (1975)'
    },
    descripcion: {
      es: 'En 1975 la ONU estableció el 8 de marzo como Día Internacional de la Mujer.',
      en: 'In 1975 the UN established March 8 as International Women\'s Day.',
      ca: 'El 1975 l\'ONU va establir el 8 de març com a Dia Internacional de la Dona.',
      val: 'El 1975 l\'ONU va establir el 8 de març com a Dia Internacional de la Dona.',
      gl: 'En 1975 a ONU estableceu o 8 de marzo como Día Internacional da Muller.',
      eu: '1975ean NBEk martxoak 8 Emakumeen Nazioarteko Egun gisa ezarri zuen.'
    },
    descripcion_lectura_facil: {
      es: 'El 8 de marzo es el Día de la Mujer. Se celebra desde 1975 en todo el mundo.',
      en: 'March 8 is Women\'s Day. It has been celebrated worldwide since 1975.',
      ca: 'El 8 de març és el Dia de la Dona. Es celebra des de 1975 a tot el món.',
      val: 'El 8 de març és el Dia de la Dona. Es celebra des de 1975 a tot el món.',
      gl: 'O 8 de marzo é o Día da Muller. Celébrase desde 1975 en todo o mundo.',
      eu: 'Martxoak 8 Emakumeen Eguna da. 1975az geroztik ospatzen da mundu osoan.'
    },
    hashtags: [sampleHashtags[2], sampleHashtags[1], sampleHashtags[7]],
    anio: 1975,
    activo: true,
    fecha_publicacion: new Date('2024-02-10'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-02-05'),
    fecha_modificacion: new Date('2024-02-10'),
    video_lse_url: 'https://example.com/videos/dia-internacional-mujer-lse.mp4',
    video_transcription: createMultilingualText('Vídeo explicativo sobre el Día Internacional de la Mujer, su historia y su importancia en la lucha por la igualdad de género.')
  },
  {
    id: '5',
    slug: 'movimiento-me-too',
    tipo: 'historia',
    titulo: {
      es: 'Movimiento #MeToo (2017)',
      en: '#MeToo Movement (2017)',
      ca: 'Moviment #MeToo (2017)',
      val: 'Moviment #MeToo (2017)',
      gl: 'Movemento #MeToo (2017)',
      eu: '#MeToo Mugimendua (2017)'
    },
    descripcion: {
      es: 'El movimiento #MeToo surgió en 2017 para denunciar el acoso y la violencia sexual.',
      en: 'The #MeToo movement emerged in 2017 to denounce harassment and sexual violence.',
      ca: 'El moviment #MeToo va sorgir el 2017 per denunciar l\'assetjament i la violència sexual.',
      val: 'El moviment #MeToo va sorgir el 2017 per denunciar l\'assetjament i la violència sexual.',
      gl: 'O movemento #MeToo xurdiu en 2017 para denunciar o acoso e a violencia sexual.',
      eu: '#MeToo mugimendua 2017an sortu zen jazarpena eta sexu-indarkeria salatzeko.'
    },
    descripcion_lectura_facil: {
      es: 'En 2017 muchas mujeres compartieron sus experiencias de acoso. Esto se llamó movimiento MeToo.',
      en: 'In 2017 many women shared their experiences of harassment. This was called the MeToo movement.',
      ca: 'El 2017 moltes dones van compartir les seves experiències d\'assetjament. Això es va anomenar moviment MeToo.',
      val: 'El 2017 moltes dones van compartir les seues experiències d\'assetjament. Açò es va dir moviment MeToo.',
      gl: 'En 2017 moitas mulleres comparteron as súas experiencias de acoso. Isto chamouse movemento MeToo.',
      eu: '2017an emakume askok jazarpen-esperientziak partekatu zituzten. Hori MeToo mugimendua deitu zen.'
    },
    hashtags: [sampleHashtags[4], sampleHashtags[7], sampleHashtags[2]],
    anio: 2017,
    activo: true,
    fecha_publicacion: new Date('2024-03-01'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-02-25'),
    fecha_modificacion: new Date('2024-03-01'),
    video_lse_url: 'https://example.com/videos/movimiento-me-too-lse.mp4',
    video_transcription: createMultilingualText('Vídeo sobre el movimiento #MeToo, su origen, impacto y significado en la lucha contra el acoso y la violencia sexual.')
  }
];

