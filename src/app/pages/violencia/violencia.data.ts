/**
 * Datos estáticos para la página de violencia
 * Implementa la funcionalidad de US-009
 */

import {
  ViolenciaContent,
  Hashtag,
  MultilingualText
} from '../../core/models/content.model';

// Hashtags relacionados con violencia
export const sampleHashtags: Hashtag[] = [
  { id: '1', nombre: { es: 'Violencia de género', en: 'Gender violence', ca: 'Violència de gènere', val: 'Violència de gènere', gl: 'Violencia de xénero', eu: 'Genero indarkeria' }, slug: 'violencia-genero', descripcion: 'Violencia ejercida contra las mujeres' },
  { id: '2', nombre: { es: 'Violencia física', en: 'Physical violence', ca: 'Violència física', val: 'Violència física', gl: 'Violencia física', eu: 'Indarkeria fisikoa' }, slug: 'violencia-fisica', descripcion: 'Violencia física' },
  { id: '3', nombre: { es: 'Violencia psicológica', en: 'Psychological violence', ca: 'Violència psicològica', val: 'Violència psicològica', gl: 'Violencia psicolóxica', eu: 'Indarkeria psikologikoa' }, slug: 'violencia-psicologica', descripcion: 'Violencia psicológica y emocional' },
  { id: '4', nombre: { es: 'Violencia sexual', en: 'Sexual violence', ca: 'Violència sexual', val: 'Violència sexual', gl: 'Violencia sexual', eu: 'Sexu indarkeria' }, slug: 'violencia-sexual', descripcion: 'Violencia sexual' },
  { id: '5', nombre: { es: 'Violencia económica', en: 'Economic violence', ca: 'Violència econòmica', val: 'Violència econòmica', gl: 'Violencia económica', eu: 'Indarkeria ekonomikoa' }, slug: 'violencia-economica', descripcion: 'Violencia económica' },
  { id: '6', nombre: { es: 'Violencia digital', en: 'Digital violence', ca: 'Violència digital', val: 'Violència digital', gl: 'Violencia dixital', eu: 'Indarkeria digitala' }, slug: 'violencia-digital', descripcion: 'Violencia en el entorno digital' },
  { id: '7', nombre: { es: 'Señales de alerta', en: 'Warning signs', ca: 'Senyals d\'alerta', val: 'Senyals d\'alerta', gl: 'Sinais de alerta', eu: 'Alerta seinaleak' }, slug: 'senales-alerta', descripcion: 'Señales de alerta de violencia' },
  { id: '8', nombre: { es: 'Recursos de ayuda', en: 'Help resources', ca: 'Recursos d\'ajuda', val: 'Recursos d\'ajuda', gl: 'Recursos de axuda', eu: 'Laguntza baliabideak' }, slug: 'recursos-ayuda', descripcion: 'Recursos y ayuda disponible' },
];

// Contenidos de ejemplo relacionados con violencia
export const sampleContents: ViolenciaContent[] = [
  {
    id: '1',
    slug: 'violencia-fisica',
    tipo: 'violencia',
    titulo: {
      es: 'Violencia física',
      en: 'Physical violence',
      ca: 'Violència física',
      val: 'Violència física',
      gl: 'Violencia física',
      eu: 'Indarkeria fisikoa'
    },
    descripcion: {
      es: 'Cualquier acto que cause daño físico a una mujer.',
      en: 'Any act that causes physical harm to a woman.',
      ca: 'Qualsevol acte que causi dany físic a una dona.',
      val: 'Qualsevol acte que cause dany físic a una dona.',
      gl: 'Calquera acto que cause dano físico a unha muller.',
      eu: 'Emakume bati kalte fisikoa eragiten dion edozein ekintza.'
    },
    descripcion_lectura_facil: {
      es: 'La violencia física es cuando alguien te hace daño en el cuerpo. Puede ser golpes, empujones o cualquier cosa que te haga daño físico.',
      en: 'Physical violence is when someone hurts your body. It can be hitting, pushing or anything that physically hurts you.',
      ca: 'La violència física és quan algú et fa mal al cos. Pot ser cops, empentes o qualsevol cosa que et faci mal físic.',
      val: 'La violència física és quan algú et fa mal al cos. Pot ser colps, empentes o qualsevol cosa que et faça mal físic.',
      gl: 'A violencia física é cando alguén che fai dano no corpo. Pode ser golpes, empurróns ou calquera cousa que che faga dano físico.',
      eu: 'Indarkeria fisikoa gorputzean min egiten dizutenean da. Kolpeak, bultzadak edo fisikoki min egiten dizun edozer izan daiteke.'
    },
    senales_alerta: {
      es: 'Golpes, empujones, heridas, moretones, fracturas.',
      en: 'Hitting, pushing, wounds, bruises, fractures.',
      ca: 'Cops, empentes, ferides, blaus, fractures.',
      val: 'Colps, empentes, ferides, blaus, fractures.',
      gl: 'Golpes, empurróns, feridas, moratóns, fracturas.',
      eu: 'Kolpeak, bultzadak, zauriak, ubeldura, hausturak.'
    },
    hashtags: [sampleHashtags[0], sampleHashtags[1], sampleHashtags[6]],
    recursos_ayuda: ['016', '112'],
    activo: true,
    fecha_publicacion: new Date('2024-01-15'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-01-10'),
    fecha_modificacion: new Date('2024-01-15'),
    referencias: [
      { titulo: 'Ley Orgánica 1/2004', url: 'https://www.boe.es', anio: 2004 }
    ]
  },
  {
    id: '2',
    slug: 'violencia-psicologica',
    tipo: 'violencia',
    titulo: {
      es: 'Violencia psicológica',
      en: 'Psychological violence',
      ca: 'Violència psicològica',
      val: 'Violència psicològica',
      gl: 'Violencia psicolóxica',
      eu: 'Indarkeria psikologikoa'
    },
    descripcion: {
      es: 'Cualquier acto que cause daño emocional o psicológico.',
      en: 'Any act that causes emotional or psychological harm.',
      ca: 'Qualsevol acte que causi dany emocional o psicològic.',
      val: 'Qualsevol acte que cause dany emocional o psicològic.',
      gl: 'Calquera acto que cause dano emocional ou psicolóxico.',
      eu: 'Kalte emozionala edo psikologikoa eragiten duen edozein ekintza.'
    },
    descripcion_lectura_facil: {
      es: 'La violencia psicológica es cuando alguien te hace sentir mal con palabras o acciones. Te insulta, te amenaza o te hace sentir que no vales nada.',
      en: 'Psychological violence is when someone makes you feel bad with words or actions. They insult you, threaten you or make you feel worthless.',
      ca: 'La violència psicològica és quan algú et fa sentir malament amb paraules o accions. T\'insulta, t\'amenaça o et fa sentir que no vals res.',
      val: 'La violència psicològica és quan algú et fa sentir malament amb paraules o accions. T\'insulta, t\'amenaça o et fa sentir que no vals res.',
      gl: 'A violencia psicolóxica é cando alguén che fai sentir mal con palabras ou accións. Insúltate, ameázate ou fai que sintas que non vales nada.',
      eu: 'Indarkeria psikologikoa hitz edo ekintzen bidez gaizki sentiarazten dizutenean da. Iraintzen zaituzte, mehatxatzen zaituzte edo ezertarako balio ez duzula sentiarazten dizute.'
    },
    senales_alerta: {
      es: 'Insultos, amenazas, humillaciones, aislamiento, control excesivo.',
      en: 'Insults, threats, humiliation, isolation, excessive control.',
      ca: 'Insults, amenaces, humiliacions, aïllament, control excessiu.',
      val: 'Insults, amenaces, humiliacions, aïllament, control excessiu.',
      gl: 'Insultos, ameazas, humillacións, illamento, control excesivo.',
      eu: 'Irainak, mehatxuak, umiliazioak, isolamendua, kontrol gehiegizkoa.'
    },
    hashtags: [sampleHashtags[0], sampleHashtags[2], sampleHashtags[6]],
    recursos_ayuda: ['016', '112'],
    activo: true,
    fecha_publicacion: new Date('2024-01-20'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-01-15'),
    fecha_modificacion: new Date('2024-01-20')
  },
  {
    id: '3',
    slug: 'violencia-sexual',
    tipo: 'violencia',
    titulo: {
      es: 'Violencia sexual',
      en: 'Sexual violence',
      ca: 'Violència sexual',
      val: 'Violència sexual',
      gl: 'Violencia sexual',
      eu: 'Sexu-indarkeria'
    },
    descripcion: {
      es: 'Cualquier acto de naturaleza sexual realizado sin consentimiento.',
      en: 'Any act of a sexual nature carried out without consent.',
      ca: 'Qualsevol acte de naturalesa sexual realitzat sense consentiment.',
      val: 'Qualsevol acte de naturalesa sexual realitzat sense consentiment.',
      gl: 'Calquera acto de natureza sexual realizado sen consentimento.',
      eu: 'Adostasunik gabe egindako sexu-izaerako edozein ekintza.'
    },
    descripcion_lectura_facil: {
      es: 'La violencia sexual es cuando alguien te obliga a hacer algo sexual que no quieres. Siempre necesitas dar tu permiso para cualquier acto sexual.',
      en: 'Sexual violence is when someone forces you to do something sexual that you do not want. You always need to give your consent for any sexual act.',
      ca: 'La violència sexual és quan algú t\'obliga a fer alguna cosa sexual que no vols. Sempre necessites donar el teu permís per a qualsevol acte sexual.',
      val: 'La violència sexual és quan algú t\'obliga a fer alguna cosa sexual que no vols. Sempre necessites donar el teu permís per a qualsevol acte sexual.',
      gl: 'A violencia sexual é cando alguén che obriga a facer algo sexual que non queres. Sempre necesitas dar o teu permiso para calquera acto sexual.',
      eu: 'Sexu-indarkeria nahi ez duzun sexu-zerbait egitera behartzen zaituzteanean da. Beti eman behar duzu zure baimena edozein sexu-ekintzarako.'
    },
    senales_alerta: {
      es: 'Agresiones sexuales, acoso sexual, coacción sexual.',
      en: 'Sexual assault, sexual harassment, sexual coercion.',
      ca: 'Agressions sexuals, assetjament sexual, coacció sexual.',
      val: 'Agressions sexuals, assetjament sexual, coacció sexual.',
      gl: 'Agresións sexuais, acoso sexual, coacción sexual.',
      eu: 'Sexu-erasoak, sexu-jazarpena, sexu-hertsapena.'
    },
    hashtags: [sampleHashtags[0], sampleHashtags[3], sampleHashtags[6]],
    recursos_ayuda: ['016', '112'],
    activo: true,
    fecha_publicacion: new Date('2024-02-01'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-01-25'),
    fecha_modificacion: new Date('2024-02-01')
  },
  {
    id: '4',
    slug: 'violencia-economica',
    tipo: 'violencia',
    titulo: {
      es: 'Violencia económica',
      en: 'Economic violence',
      ca: 'Violència econòmica',
      val: 'Violència econòmica',
      gl: 'Violencia económica',
      eu: 'Indarkeria ekonomikoa'
    },
    descripcion: {
      es: 'Control o limitación del acceso a recursos económicos.',
      en: 'Control or limitation of access to economic resources.',
      ca: 'Control o limitació de l\'accés a recursos econòmics.',
      val: 'Control o limitació de l\'accés a recursos econòmics.',
      gl: 'Control ou limitación do acceso a recursos económicos.',
      eu: 'Baliabide ekonomikoetarako sarbidearen kontrola edo mugatzea.'
    },
    descripcion_lectura_facil: {
      es: 'La violencia económica es cuando alguien controla tu dinero. No te deja trabajar, te quita tu dinero o no te da lo necesario para vivir.',
      en: 'Economic violence is when someone controls your money. They do not let you work, take your money or do not give you what you need to live.',
      ca: 'La violència econòmica és quan algú controla els teus diners. No et deixa treballar, et pren els diners o no et dóna el necessari per viure.',
      val: 'La violència econòmica és quan algú controla els teus diners. No et deixa treballar, et pren els diners o no et dóna el necessari per a viure.',
      gl: 'A violencia económica é cando alguén controla o teu diñeiro. Non che deixa traballar, quítache o diñeiro ou non che dá o necesario para vivir.',
      eu: 'Indarkeria ekonomikoa zure dirua kontrolatzen dutenean da. Ez zaituzte lan egiten uzten, dirua kentzen dizute edo bizitzeko beharrezkoa ez dizute ematen.'
    },
    senales_alerta: {
      es: 'Control del dinero, prohibición de trabajar, limitación de recursos básicos.',
      en: 'Money control, prohibition from working, limitation of basic resources.',
      ca: 'Control dels diners, prohibició de treballar, limitació de recursos bàsics.',
      val: 'Control dels diners, prohibició de treballar, limitació de recursos bàsics.',
      gl: 'Control do diñeiro, prohibición de traballar, limitación de recursos básicos.',
      eu: 'Diruaren kontrola, lan egiteko debekua, oinarrizko baliabideen mugatzea.'
    },
    hashtags: [sampleHashtags[0], sampleHashtags[4], sampleHashtags[6]],
    recursos_ayuda: ['016'],
    activo: true,
    fecha_publicacion: new Date('2024-02-10'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-02-05'),
    fecha_modificacion: new Date('2024-02-10')
  },
  {
    id: '5',
    slug: 'violencia-digital',
    tipo: 'violencia',
    titulo: {
      es: 'Violencia digital',
      en: 'Digital violence',
      ca: 'Violència digital',
      val: 'Violència digital',
      gl: 'Violencia dixital',
      eu: 'Indarkeria digitala'
    },
    descripcion: {
      es: 'Violencia ejercida a través de medios digitales y redes sociales.',
      en: 'Violence carried out through digital media and social networks.',
      ca: 'Violència exercida a través de mitjans digitals i xarxes socials.',
      val: 'Violència exercida a través de mitjans digitals i xarxes socials.',
      gl: 'Violencia exercida a través de medios dixitais e redes sociais.',
      eu: 'Bitarteko digitalen eta sare sozialen bidez egindako indarkeria.'
    },
    descripcion_lectura_facil: {
      es: 'La violencia digital es cuando alguien te hace daño usando internet o el móvil. Puede ser acoso, amenazas o compartir fotos sin tu permiso.',
      en: 'Digital violence is when someone hurts you using the internet or a mobile phone. It can be harassment, threats or sharing photos without your permission.',
      ca: 'La violència digital és quan algú et fa mal usant internet o el mòbil. Pot ser assetjament, amenaces o compartir fotos sense el teu permís.',
      val: 'La violència digital és quan algú et fa mal usant internet o el mòbil. Pot ser assetjament, amenaces o compartir fotos sense el teu permís.',
      gl: 'A violencia dixital é cando alguén che fai dano usando internet ou o móbil. Pode ser acoso, ameazas ou compartir fotos sen o teu permiso.',
      eu: 'Indarkeria digitala internet edo mugikorra erabiliz min egiten dizutenean da. Jazarpena, mehatxuak edo argazkiak zure baimenik gabe partekatzea izan daiteke.'
    },
    senales_alerta: {
      es: 'Acoso online, amenazas por redes sociales, control de dispositivos, difusión de imágenes sin consentimiento.',
      en: 'Online harassment, social media threats, device control, sharing images without consent.',
      ca: 'Assetjament online, amenaces per xarxes socials, control de dispositius, difusió d\'imatges sense consentiment.',
      val: 'Assetjament online, amenaces per xarxes socials, control de dispositius, difusió d\'imatges sense consentiment.',
      gl: 'Acoso online, ameazas por redes sociais, control de dispositivos, difusión de imaxes sen consentimento.',
      eu: 'Online jazarpena, sare sozialetako mehatxuak, gailuen kontrola, irudien hedapena adostasunik gabe.'
    },
    hashtags: [sampleHashtags[0], sampleHashtags[5], sampleHashtags[6]],
    recursos_ayuda: ['016', '017'],
    activo: true,
    fecha_publicacion: new Date('2024-03-01'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-02-25'),
    fecha_modificacion: new Date('2024-03-01')
  },
  {
    id: '6',
    slug: 'violencia-institucional',
    tipo: 'violencia',
    titulo: {
      es: 'Violencia institucional',
      en: 'Institutional violence',
      ca: 'Violència institucional',
      val: 'Violència institucional',
      gl: 'Violencia institucional',
      eu: 'Indarkeria instituzionala'
    },
    descripcion: {
      es: 'Acciones u omisiones de instituciones públicas que vulneran derechos.',
      en: 'Actions or omissions by public institutions that violate rights.',
      ca: 'Accions o omissions d\'institucions públiques que vulneren drets.',
      val: 'Accions o omissions d\'institucions públiques que vulneren drets.',
      gl: 'Accións ou omisións de institucións públicas que vulneran dereitos.',
      eu: 'Eskubideak urratzen dituzten erakunde publikoen ekintzak edo hutsegiteak.'
    },
    descripcion_lectura_facil: {
      es: 'La violencia institucional es cuando las instituciones públicas no te ayudan o te tratan mal. Por ejemplo, cuando la policía o los servicios sociales no te creen o no te ayudan.',
      en: 'Institutional violence is when public institutions do not help you or treat you badly. For example, when the police or social services do not believe you or do not help you.',
      ca: 'La violència institucional és quan les institucions públiques no t\'ajuden o et tracten malament. Per exemple, quan la policia o els serveis socials no et creuen o no t\'ajuden.',
      val: 'La violència institucional és quan les institucions públiques no t\'ajuden o et tracten malament. Per exemple, quan la policia o els servicis socials no et creuen o no t\'ajuden.',
      gl: 'A violencia institucional é cando as institucións públicas non che axudan ou che tratan mal. Por exemplo, cando a policía ou os servizos sociais non che cren ou non che axudan.',
      eu: 'Indarkeria instituzionala erakunde publikoek laguntzen ez dizutenean edo gaizki tratatzen zaituzteanean da. Adibidez, poliziak edo gizarte-zerbitzuek sinisten ez dizutenean edo laguntzen ez dizutenean.'
    },
    senales_alerta: {
      es: 'Falta de respuesta institucional, revictimización, falta de recursos.',
      en: 'Lack of institutional response, revictimization, lack of resources.',
      ca: 'Falta de resposta institucional, revictimització, falta de recursos.',
      val: 'Falta de resposta institucional, revictimització, falta de recursos.',
      gl: 'Falta de resposta institucional, revitimización, falta de recursos.',
      eu: 'Erantzun instituzional eza, berbirbiktimizazioa, baliabide falta.'
    },
    hashtags: [sampleHashtags[0], sampleHashtags[7], sampleHashtags[6]],
    recursos_ayuda: ['016'],
    activo: true,
    fecha_publicacion: new Date('2024-03-15'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-03-10'),
    fecha_modificacion: new Date('2024-03-15')
  }
];
