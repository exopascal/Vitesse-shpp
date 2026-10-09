import type { ShopifyCollection } from '~/store/shopifyStore'
import { resolveCollectionPagePreset } from '~/utils/collectionPageConfig'

type ButtonVariant = 'default' | 'tapex' | 'torque' | 'exopek' | 'sportreact' | 'witty' | 'tunturi'

function buildTunturiCollectionContent(): CollectionHeroContent {
  return {
    kicker: '',
    title: '',
    text: '',
    backgroundImage: '/tunturi-collection-platinum-edition.jpg',
    buttonText: '',
    href: '',
    buttonVariant: 'tunturi',
    sizeVariant: 'natural',
    overlay: false,
  }
}

export interface CollectionHeroContent {
  kicker: string
  title: string
  text: string
  backgroundVideo?: string
  backgroundImage?: string
  buttonText: string
  href: string
  buttonVariant: ButtonVariant
  sizeVariant?: 'default' | 'home' | 'compact' | 'natural'
  overlay?: boolean
}

export interface CollectionSeoContent {
  title: string
  titleTag?: 'h1' | 'h2'
  subtitle?: string
  body: string
  productsSectionTitle?: string
  goalsTitle?: string
  goals?: Array<{
    title: string
    description: string
  }>
  outro?: string
}

function buildSprinttrainingCollectionContent(collection?: ShopifyCollection | null): CollectionHeroContent {
  return {
    kicker: 'Overspeed Training',
    title: collection?.title || 'Overspeed Training',
    text: 'Explosive Starts, beschleunigte Schritte und messbare Leistungssteigerung.',
    backgroundVideo: '/T-Apex-1080motion-seilzugtraining.mov',
    backgroundImage: collection?.image || '',
    buttonText: 'Produkte entdecken',
    href: '#collection-products',
    buttonVariant: 'tapex',
  }
}

function buildWittyCollectionContent(collection?: ShopifyCollection | null): CollectionHeroContent {
  return {
    kicker: 'Zeitmessung',
    title: collection?.title || 'Witty',
    text: collection?.description || 'Praezise Lichtschranken, Sensorik und Zeitmessung fuer Tests, Performance-Diagnostik und modernes Athletiktraining.',
    backgroundImage: '/zeitmessung-witty-microgate-lichtschranke.jpg',
    buttonText: 'Produkte entdecken',
    href: '#collection-products',
    buttonVariant: 'witty',
  }
}

function buildSportreactCollectionContent(collection?: ShopifyCollection | null): CollectionHeroContent {
  return {
    kicker: 'Reaktionstraining',
    title: collection?.title || 'Sportreact',
    text: collection?.description || 'Intelligentes Licht-, Sound- und Vibrationsfeedback fuer Reaktionsgeschwindigkeit, Wahrnehmung und kognitives Training.',
    backgroundImage: '/sportreact-reaktionsgeschwindigkeit-laser-gates.jpg',
    buttonText: 'Produkte entdecken',
    href: '#collection-products',
    buttonVariant: 'sportreact',
  }
}

function buildTunturiSeoContent(): CollectionSeoContent {
  return {
    title: 'Tunturi Platinum Edition – Kommerzielle Fitnessgeräte.',
    titleTag: 'h1',
    subtitle: 'Für anspruchsvolle Nutzer und Spitzenleistung.',
    body:
      'Die Tunturi Platinum Serie vereint hochwertige Ausdauergeräte für den professionellen Einsatz in Fitnessstudios, Firmenfitness-Bereichen und Rehabilitationszentren. Von Indoor Bikes über Ergometer bis hin zu Laufbändern und Armergometern — jedes Gerät ist auf präzise Trainingssteuerung, robuste Bauweise und breite App-Konnektivität ausgelegt.',
    goalsTitle: 'Die Vorteile von Tunturi',
    goals: [
      {
        title: 'Professionelles Ausdauertraining',
        description: 'Leistungsstarke EMS- und Servo-Bremssysteme für präzise Widerstandssteuerung im Studio- und Rehaeinsatz.',
      },
      {
        title: 'Rehabilitation & Physiotherapie',
        description: 'Niedriger Einstieg, gelenkschonende Bewegungsabläufe und sanfte Widerstandsprofile für kontrollierte Belastungssteigerung.',
      },
      {
        title: 'Gruppentraining & Kursbetrieb',
        description: 'Schnelle Nutzeranpassung, Not-Aus-Systeme und App-Konnektivität für dynamischen Mehrbenutzerbetrieb.',
      },
      {
        title: 'Lauf-, Kraft- & Ganzkörpertraining',
        description: 'Vom Laufband über den Crosstrainer bis zum Armergometer — vollständige Abdeckung aller Ausdauermodalitäten.',
      },
    ],
    outro: 'Die Tunturi Platinum Kollektion besteht aus kommerziellen Fitnessgeräten, die für anspruchsvolle Benutzer entwickelt wurden, die Spitzenleistung erzielen wollen. Egal, ob du zu Hause trainierst, ein Fitnessstudio betreibst oder als Physiotherapeut arbeitest.',
  }
}

function buildSprinttrainingSeoContent(): CollectionSeoContent {
  return {
    title: 'Speed, Explosivität, Overspeed Training!',
    body:
      'Sprint- und Explosivkrafttraining sind essenziell für jeden Athleten, der seine Beschleunigung, Top-Speed und Schnellkraft verbessern will. Egal ob für Leichtathleten, Fußballer oder Teamsportler, gezieltes Sprinttraining steigert die Schnelligkeit, Agilität und Kraftentfaltung. Durch Sprintwiderstand, Overspeed-Training und gezielte Bewegungsanalysen lassen sich Leistungsreserven optimal ausschöpfen.',
    productsSectionTitle: 'Unsere Produkte für mehr Geschwindigkeit.',
    goals: [
      {
        title: 'Sprintgeschwindigkeit & Antritt verbessern',
        description:
          'Optimiere die ersten Schritte, beschleunige schneller und entwickle mehr Vortrieb in den entscheidenden Metern.',
      },
      {
        title: 'Explosivkraft & Schnellkraft steigern',
        description:
          'Baue mehr Druck in der Abdruckphase auf und verbessere deine Kraftentfaltung für Sprints und explosive Aktionen.',
      },
      {
        title: 'Agilität & Richtungswechsel optimieren',
        description:
          'Trainiere dynamische Bewegungswechsel, Reaktionsfähigkeit und kontrollierte Beschleunigung nach jedem Cut.',
      },
      {
        title: 'Sprintmechanik & Technik analysieren',
        description:
          'Nutze Daten und Bewegungsanalysen, um Lauftechnik, Schrittmuster und Belastungssteuerung präzise zu verbessern.',
      },
    ],
  }
}

export function getCollectionHeroContent(
  collection?: ShopifyCollection | null,
  slug?: string
): CollectionHeroContent | null {
  const preset = resolveCollectionPagePreset(slug || collection?.handle)

  switch (preset.contentKey) {
    case 'sprinttraining':
      return buildSprinttrainingCollectionContent(collection)
    case 'witty':
      return buildWittyCollectionContent(collection)
    case 'sportreact':
      return buildSportreactCollectionContent(collection)
    case 'tunturi':
      return buildTunturiCollectionContent()
    default:
      return null
  }
}

export function getCollectionSeoContent(
  collection?: ShopifyCollection | null,
  slug?: string
): CollectionSeoContent | null {
  const preset = resolveCollectionPagePreset(slug || collection?.handle)

  switch (preset.contentKey) {
    case 'sprinttraining':
      return buildSprinttrainingSeoContent()
    case 'tunturi':
      return buildTunturiSeoContent()
    default:
      return null
  }
}
