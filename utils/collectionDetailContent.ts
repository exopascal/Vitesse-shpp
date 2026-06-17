import type { ShopifyCollection } from '~/store/shopifyStore'
import { resolveCollectionPagePreset } from '~/utils/collectionPageConfig'

type ButtonVariant = 'default' | 'tapex' | 'torque' | 'exopek' | 'sportreact' | 'witty' | 'tunturi'

export interface CollectionHeroContent {
  kicker: string
  title: string
  text: string
  backgroundVideo?: string
  backgroundImage?: string
  buttonText: string
  href: string
  buttonVariant: ButtonVariant
}

export interface CollectionSeoContent {
  title: string
  body: string
  productsSectionTitle?: string
  goals?: Array<{
    title: string
    description: string
  }>
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
    default:
      return null
  }
}
