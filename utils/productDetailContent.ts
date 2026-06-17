import type { ShopifyProduct } from '~/types/domain/shopify'
import { resolveProductPagePreset } from '~/utils/productPageConfig'

export interface ProductHighlightsContentItem {
  body: string;
  image: string;
  alt: string;
}

export interface ProductHighlightsContent {
  kicker: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
  items: ProductHighlightsContentItem[];
}

export interface ProductBannerContent {
  title: string;
  text: string;
  image: string;
  alt: string;
  actionLabel?: string;
  actionHref?: string;
}

export interface ProductFeatureContentItem {
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface ProductFeaturesContent {
  title: string;
  items: ProductFeatureContentItem[];
}

export interface ProductFaqItem {
  question: string;
  answer: string[];
}

export interface ProductFaqContent {
  title: string;
  subtitle: string;
  items: ProductFaqItem[];
  initiallyOpen?: number[];
}

export interface ProductDetailContent {
  highlights: ProductHighlightsContent;
  banner: ProductBannerContent;
  features: ProductFeaturesContent;
  faq: ProductFaqContent;
}

function normalizeValue(value?: string) {
  return (value || '').trim().toLowerCase()
}

function dedupeImages(images: Array<string | undefined>) {
  return images.filter((image, index, list): image is string => Boolean(image) && list.indexOf(image) === index)
}

function createImageResolver(product?: ShopifyProduct | null) {
  const productImages = dedupeImages([...(product?.images || []), product?.featured_image])

  return (fallback: string | undefined, index: number, alt: string) => ({
    image: fallback || productImages[index % productImages.length] || 'https://placehold.co/1200x900',
    alt,
  })
}

function buildTApexContent(product?: ShopifyProduct | null): ProductDetailContent {
  const image = createImageResolver(product)

  return {
    highlights: {
      kicker: 'Product Highlights',
      title: `${product?.title || 'T-Apex'}. Sprint smarter.`,
      ctaLabel: 'Weitere Produkte',
      ctaHref: '/products?collection=sprinttraining#products-archive-controls',
      items: [
        {
          body: 'Explosive Starts und kontrollierte Beschleunigung fuer Sprinttraining mit konstantem Zugwiderstand.',
          ...image('/t-apex-zugwiderstandtraining-sprinttraining.jpg', 0, 'Sprinttraining mit T-Apex Zugwiderstand'),
        },
        {
          body: 'Zeiteffiziente Sessions fuer Technik, Antritt und Overspeed-Impulse in einem Setup.',
          ...image('/zugwiderstand-t-apex-sprinttrainer.jpg', 1, 'T-Apex Sprinttrainer im Einsatz'),
        },
        {
          body: 'Robuste Hardware fuer wiederholbare Belastung im Performance-Training auf dem Feld und auf der Bahn.',
          ...image('/t-apex-sprinttrainer.webp', 2, 'T-Apex Trainingsgeraet im Outdoor-Einsatz'),
        },
        {
          body: 'Direktes Feedback fuer Athlet:innen, die Sprintmechanik und Widerstandsprofil sauber trainieren wollen.',
          ...image('/spitzenprodukte-sprinttraining-widerstandstraining-speedtraining.jpg', 3, 'Athletisches Sprinttraining mit Widerstand'),
        },
        {
          body: 'Mobil einsetzbar fuer Teamtraining, Einzelcoaching und strukturierte Progression im Speed-Block.',
          ...image('/spitzenprodukte-sprinttraining-widerstandstraining-speedtraining-mobil.jpg', 4, 'Mobiles Sprinttraining im Outdoor-Setting'),
        },
      ],
    },
    banner: {
      title: 'Die Zukunft des Seilzugtrainings.',
      text:
        'Trainiere smart und dynamisch. Steigere deine Leistung messbar. Laufen kann jeder. Wer schneller sein will, trainiert mit System.',
      ...image('/t-apex-zugwiderstandtraining-sprinttraining.jpg', 0, 'T-Apex Seilzugtraining im Einsatz'),
      actionLabel: 'See it in Action',
      actionHref: '/T-Apex-1080motion-seilzugtraining.mov',
    },
    features: {
      title: 'Maximale Performance',
      items: [
        {
          title: 'Leistung kompakt',
          description:
            'T-APEX wurde fuer maximale Mobilitaet und Komfort entwickelt. Mit einem Gewicht von nur 20 kg laesst es sich leicht transportieren und ueberall aufstellen.',
          ...image('/t-apex-sprinttrainer.webp', 0, 'Kompaktes T-Apex Trainingsgeraet'),
        },
        {
          title: 'Nahtloser Transport',
          description:
            'Der Transport von T-APEX ist einfach, ob mit dem Auto oder auf Reisen. Das mobile Setup macht leistungsorientiertes Training flexibel planbar.',
          ...image('/zugwiderstand-t-apex-sprinttrainer.jpg', 1, 'Transportables T-Apex System im Einsatz'),
        },
        {
          title: 'Schneller Aufbau',
          description:
            'Das Einstellsystem ist auf schnelle Einsatzbereitschaft ausgelegt. Training starten, Widerstand anpassen und ohne Reibungsverlust in die Einheit gehen.',
          ...image('/t-apex-zugwiderstandtraining-sprinttraining.jpg', 2, 'T-Apex mit schnellem Aufbau fuer Sprinttraining'),
        },
      ],
    },
    faq: {
      title: 'FAQs',
      subtitle: 'Wir beantworten Deine Fragen',
      initiallyOpen: [0, 1],
      items: [
        {
          question: 'Muss ich ein Abo abschliessen?',
          answer: [
            'Nein. Wir erheben kein Abonnement fuer die Standardversion. Falls Sie besondere Anforderungen haben, koennen wir die Software anpassen, wobei die Kosten je nach Arbeitsaufwand variieren.',
          ],
        },
        {
          question: 'Gibt es eine persoenliche oder Online-Schulung fuer Tipps zur Fehlerbehebung?',
          answer: [
            'Auf Wunsch bietet der Hersteller Sitzungen an, um das Geraet und den Prozess zu erklaeren.',
          ],
        },
        {
          question: 'Ermoeglicht das System unterstuetzte Sprints / Overspeed-Training?',
          answer: [
            'Ja, der T-APEX bietet Overspeed-Training. Das Geraet selbst kann eine Zuggeschwindigkeit von 0 bis 7 m/s bereitstellen, was fuer Sportarten mit niedrigerer Geschwindigkeit wie Schwimmen ausgelegt ist.',
            'Fuer Sprint-Training koennen Sie unser Overspeed-Zubehoer hinzufuegen, mit dem die Geschwindigkeit auf bis zu 14 m/s erhoeht werden kann.',
            'Aus softwaretechnischer Sicht unterstuetzt der T-APEX auch individuelles Overspeed-Training. Sie koennen bis zu 10 verschiedene Geschwindigkeitsintervalle eingeben, zum Beispiel 0 m/s, 5 m/s, 20 m/s, 30 m/s, 12 m/s oder 5 m/s. Die Software erstellt automatisch eine gleichmaessige Geschwindigkeits- und Unterstuetzungskurve, sodass Athletinnen und Athleten ihr Training unter sicheren und realistischen Bedingungen absolvieren koennen.',
          ],
        },
        {
          question: 'Werden die Berichte / das Athleten-Managementsystem in der App oder in der Cloud gespeichert?',
          answer: [
            'Aus Datenschutzgruenden, damit Trainingsdaten von Spitzenathletinnen und Spitzenathleten nicht veroeffentlicht werden, speichern wir alle Daten offline auf dem Tablet.',
          ],
        },
        {
          question: 'Welche Daten werden erfasst?',
          answer: [
            'Der T-APEX kann Echtzeitdaten wie Geschwindigkeit, Distanz, Zeit, Kraft und Leistung praezise erfassen und wertvolle Informationen fuer die Nachbearbeitung liefern.',
            'Dazu gehoeren unter anderem diese Fragen: Wann und wo tritt die maximale Geschwindigkeit auf? Wie lange wird die Hoechstgeschwindigkeit gehalten? Wie ist die Leistung bei jedem Sprint-Schritt? Wie symmetrisch sind die Bewegungen auf beiden Seiten?',
          ],
        },
        {
          question: 'Welche Berichte werden generiert?',
          answer: [
            'Der T-APEX bietet drei Arten von Berichten: Einzeltraining, Vergleichsanalyse und Trendbericht, um ein verfolgbares Trainingsprofil zu erstellen.',
            'Einzeltraining-Bericht: Bericht ueber eine einzelne Trainingseinheit.',
            'Vergleichsbericht: Vergleichsanalyse zwischen zwei Trainingseinheiten.',
            'Trendbericht: Zeigt den Fortschritt dieses Profils ueber einen bestimmten Zeitraum an.',
          ],
        },
        {
          question: 'Gibt es eine feine Abstufung der Widerstands- / Unterstuetzungsstufen oder sind es feste Voreinstellungen?',
          answer: [
            'Der Widerstands- / Unterstuetzungsbereich liegt zwischen 0 und 15 kgf. Er kann ueber den Drehknopf am Geraet in 1-kgf-Schritten eingestellt werden.',
            'Wenn Sie das Tablet verwenden, koennen Sie den Widerstand praezise in 0,1-kgf-Schritten steuern.',
          ],
        },
        {
          question: 'Ist der T-APEX ein proprietaeres System oder kann ein externer Bildschirm (Tablet/Laptop) verbunden werden? Welches Tablet wird unterstuetzt?',
          answer: [
            'Nein, es ist kein proprietaeres System. Sie koennen unsere App auf anderen Android-Tablets installieren, sofern die Android-Version mindestens 11 betraegt und der Bildschirm mindestens 10 Zoll gross ist.',
          ],
        },
        {
          question: 'Wie weit kann das Tablet mit dem T-APEX verbunden werden?',
          answer: [
            'Die empfohlene Reichweite betraegt circa 30 Meter, abhaengig von den Umgebungsbedingungen und Signalstoerungen.',
            'Die maximal getestete Reichweite betraegt circa 100 Meter.',
          ],
        },
        {
          question: 'Ist der T-APEX fuer Flugreisen zugelassen?',
          answer: [
            'Der T-APEX verfuegt ueber eine flugzugelassene Batterie als Zubehoer, sodass er problemlos mitgenommen werden kann.',
          ],
        },
      ],
    },
  }
}

function buildExopekProContent(product?: ShopifyProduct | null): ProductDetailContent {
  const image = createImageResolver(product)

  return {
    highlights: {
      kicker: 'Product Highlights',
      title: `${product?.title || 'EXOPEK Pro'}. Widerstand mit System.`,
      ctaLabel: 'Weitere Produkte',
      ctaHref: '/products#products-archive-controls',
      items: [
        {
          body: 'Variable Widerstandsreize fuer Sprints, Beschleunigung, Richtungswechsel und athletische Zugmuster.',
          ...image('/exopek-widerstandstraining-performance-widerstandsbaender.jpg', 0, 'EXOPEK Pro Performance-Widerstandsbaender'),
        },
        {
          body: 'Schnell im Setup, klar in der Belastungssteuerung und direkt einsetzbar fuer Feld, Halle und Gym.',
          ...image(undefined, 1, `${product?.title || 'EXOPEK Pro'} im Training`),
        },
        {
          body: 'Geeignet fuer Einzelathlet:innen, Small-Group-Training und strukturierte Performance-Blocks im Teamkontext.',
          ...image(undefined, 2, `${product?.title || 'EXOPEK Pro'} Detailansicht`),
        },
        {
          body: 'Saubere Progression fuer Speed-, Power- und Return-to-Play-Einheiten mit reproduzierbaren Widerstandsstufen.',
          ...image('/exopek-widerstandstraining-performance-widerstandsbaender.jpg', 3, 'EXOPEK Pro im leistungsorientierten Widerstandstraining'),
        },
        {
          body: 'Gebaut fuer Trainer:innen, die ein mobiles Tool mit klarer Trainingslogik statt improvisierter Band-Setups wollen.',
          ...image(undefined, 4, `${product?.title || 'EXOPEK Pro'} mobil einsetzbar`),
        },
      ],
    },
    banner: {
      title: 'Widerstandstraining, das mit deinem Setup skaliert.',
      text:
        'EXOPEK Pro bringt kontrollierten Widerstand in Speed-, Kraft- und Athletik-Sessions. Schnell aufgebaut, leicht transportiert und direkt reproduzierbar im Coaching-Alltag.',
      ...image('/exopek-widerstandstraining-performance-widerstandsbaender.jpg', 0, 'EXOPEK Pro im Performance-Training'),
    },
    features: {
      title: 'Gebaut fuer Performance',
      items: [
        {
          title: 'Mobil im Einsatz',
          description:
            'EXOPEK Pro ist auf schnelle Wechsel zwischen Trainingsorten ausgelegt und passt in Setups, die ohne grossen Materialaufwand funktionieren muessen.',
          ...image('/exopek-widerstandstraining-performance-widerstandsbaender.jpg', 0, 'EXOPEK Pro mobil im Einsatz'),
        },
        {
          title: 'Saubere Progression',
          description:
            'Das System unterstuetzt klare Belastungsstufen fuer Beschleunigung, Sprinttechnik und allgemein athletisches Widerstandstraining.',
          ...image(undefined, 1, `${product?.title || 'EXOPEK Pro'} fuer progressive Belastungssteuerung`),
        },
        {
          title: 'Einfach reproduzierbar',
          description:
            'Die gleichen Komponenten und Inhalte lassen sich produktseitig schnell auf weitere EXOPEK-Produkte oder Varianten uebertragen.',
          ...image(undefined, 2, `${product?.title || 'EXOPEK Pro'} reproduzierbar aufgebaut`),
        },
      ],
    },
    faq: {
      title: 'FAQs',
      subtitle: 'Wir beantworten Deine Fragen',
      items: [],
      initiallyOpen: [],
    },
  }
}

function buildTunturiContent(product?: ShopifyProduct | null): ProductDetailContent {
  const image = createImageResolver(product)

  return {
    highlights: {
      kicker: 'Product Highlights',
      title: `${product?.title || 'Tunturi Platinum TR30 Core'}. Vielseitig im Einsatz.`,
      ctaLabel: 'Weitere Produkte',
      ctaHref: '/collections/tunturi#collection-products',
      items: [
        {
          body: 'Geeignet fuer Lauftraining, athletische Grundlageneinheiten und strukturierte Reha-Workflows in einem Setup.',
          ...image('/tunturi-schlittentraining-power.jpg', 0, 'Tunturi Laufband im Athletiktraining'),
        },
        {
          body: 'Robuste Plattform fuer Studios, Performance-Center und medizinisch betreute Return-to-Play-Prozesse.',
          ...image(undefined, 1, `${product?.title || 'Tunturi Platinum TR30 Core'} im Einsatz`),
        },
        {
          body: 'Sauber steuerbare Belastung fuer Einsteiger:innen, Leistungssport und therapeutische Progression.',
          ...image(undefined, 2, `${product?.title || 'Tunturi Platinum TR30 Core'} Detailansicht`),
        },
        {
          body: 'Kombiniert Ausdauer, Diagnostik-nahe Belastungssteuerung und funktionellen Einsatz im modernen Athletiktraining.',
          ...image('/tunturi-schlittentraining-power.jpg', 3, 'Tunturi Trainingssystem fuer Performance und Reha'),
        },
      ],
    },
    banner: {
      title: 'Training und Reha auf einer Plattform.',
      text:
        'Das Tunturi Platinum TR30 Core verbindet kontrolliertes Lauftraining mit belastbarer Studio-Hardware fuer Performance, Diagnostik und Reha.',
      ...image('/tunturi-schlittentraining-power.jpg', 0, 'Tunturi Platinum TR30 Core Hero-Bild'),
    },
    features: {
      title: 'Gebaut fuer vielseitige Umgebungen',
      items: [
        {
          title: 'Belastung kontrollieren',
          description:
            'Das System eignet sich fuer fein abgestufte Lauf- und Reha-Einheiten, bei denen Geschwindigkeit und Umfang reproduzierbar geplant werden muessen.',
          ...image('/tunturi-schlittentraining-power.jpg', 0, 'Tunturi fuer kontrollierte Laufbelastung'),
        },
        {
          title: 'Studio bis Reha',
          description:
            'Ob Performance-Flaeche, Vereinsumfeld oder medizinisch betreutes Training: das Setup laesst sich in verschiedene Anwendungsfaelle uebertragen.',
          ...image(undefined, 1, `${product?.title || 'Tunturi Platinum TR30 Core'} in Studio und Reha`),
        },
        {
          title: 'Sauber integrierbar',
          description:
            'Die Produktseite folgt derselben modularen Architektur wie andere Kernprodukte und kann damit spaeter leicht erweitert werden.',
          ...image(undefined, 2, `${product?.title || 'Tunturi Platinum TR30 Core'} modular integriert`),
        },
      ],
    },
    faq: {
      title: 'FAQs',
      subtitle: 'Wir beantworten Deine Fragen',
      items: [],
      initiallyOpen: [],
    },
  }
}

function buildOptogaitContent(product?: ShopifyProduct | null): ProductDetailContent {
  const image = createImageResolver(product)

  return {
    highlights: {
      kicker: 'Product Highlights',
      title: `${product?.title || 'Optogait'}. Praezise Bewegungsanalyse.`,
      ctaLabel: 'Weitere Produkte',
      ctaHref: '/collections/witty#collection-products',
      items: [
        {
          body: 'Optogait unterstuetzt objektive Analysen von Laufbild, Schrittparametern und Belastungsprofilen im Performance- und Reha-Umfeld.',
          ...image(undefined, 0, `${product?.title || 'Optogait'} Analyse-Setup`),
        },
        {
          body: 'Geeignet fuer Athletiktraining, Screening, Diagnostik-nahe Tests und therapeutische Verlaufskontrolle.',
          ...image(undefined, 1, `${product?.title || 'Optogait'} im Einsatz`),
        },
        {
          body: 'Messdaten lassen sich dort einsetzen, wo Bewegung nicht nur beobachtet, sondern nachvollziehbar bewertet werden soll.',
          ...image(undefined, 2, `${product?.title || 'Optogait'} Detailansicht`),
        },
        {
          body: 'Damit passt das System in moderne Setups zwischen Leistungsdiagnostik, Return-to-Play und technischer Laufanalyse.',
          ...image(undefined, 3, `${product?.title || 'Optogait'} fuer Diagnostik und Reha`),
        },
      ],
    },
    banner: {
      title: 'Analyse statt Schaetzung.',
      text:
        'Optogait bringt praezise Bewegungs- und Laufanalysen in ein Setup, das sich fuer Performance, Testung und Reha gleichermassen nutzen laesst.',
      ...image(undefined, 0, `${product?.title || 'Optogait'} Hero-Bild`),
    },
    features: {
      title: 'Gebaut fuer messbare Entscheidungen',
      items: [
        {
          title: 'Objektive Laufanalyse',
          description:
            'Schrittlaenge, Kontaktzeit, Symmetrie und weitere Parameter lassen sich strukturiert erfassen und in Trainings- oder Reha-Entscheidungen ueberfuehren.',
          ...image(undefined, 0, `${product?.title || 'Optogait'} Laufanalyse`),
        },
        {
          title: 'Vielseitig einsetzbar',
          description:
            'Das System passt in Leistungsdiagnostik, Athletiktraining, Return-to-Play und medizinisch betreute Beurteilungen von Bewegungsablaeufen.',
          ...image(undefined, 1, `${product?.title || 'Optogait'} vielseitig im Einsatz`),
        },
        {
          title: 'Modular erweiterbar',
          description:
            'Die Produktseite folgt der bestehenden modularen Architektur und kann spaeter mit produktspezifischen FAQs, Medien und Detailsektionen erweitert werden.',
          ...image(undefined, 2, `${product?.title || 'Optogait'} modular aufgebaut`),
        },
      ],
    },
    faq: {
      title: 'FAQs',
      subtitle: 'Wir beantworten Deine Fragen',
      items: [],
      initiallyOpen: [],
    },
  }
}

function buildDefaultContent(product?: ShopifyProduct | null): ProductDetailContent {
  const image = createImageResolver(product)
  const title = product?.title || 'Produkt'

  return {
    highlights: {
      kicker: 'Product Highlights',
      title: `${title}. Fuer performantes Training gebaut.`,
      ctaLabel: 'Weitere Produkte',
      ctaHref: '/products#products-archive-controls',
      items: [
        {
          body: `${title} ist fuer strukturierte Performance-Sessions mit klarer Anwendung im Training konzipiert.`,
          ...image(undefined, 0, `${title} Produktbild 1`),
        },
        {
          body: 'Die Seite nutzt wiederverwendbare Komponenten, damit weitere Produkte mit derselben Architektur ausgerollt werden koennen.',
          ...image(undefined, 1, `${title} Produktbild 2`),
        },
        {
          body: 'Produktinformationen, Bildwelten und Marketing-Copy koennen pro Produkt separat konfiguriert werden.',
          ...image(undefined, 2, `${title} Produktbild 3`),
        },
      ],
    },
    banner: {
      title: `${title} im Fokus.`,
      text: 'Diese Produktseite kombiniert Shopify-Daten mit modularen Marketing-Sektionen fuer einen sauberen, reproduzierbaren Aufbau.',
      ...image(undefined, 0, `${title} Hero-Bild`),
    },
    features: {
      title: 'Warum dieses Produkt',
      items: [
        {
          title: 'Modular aufgebaut',
          description: 'Die Produktdetailseite besteht aus wiederverwendbaren Bausteinen statt aus fest verdrahtetem Einzelmarkup.',
          ...image(undefined, 0, `${title} Feature 1`),
        },
        {
          title: 'Shopify-zentriert',
          description: 'Titel, Preise, Varianten und Verfuegbarkeit kommen direkt aus Shopify und bleiben damit konsistent.',
          ...image(undefined, 1, `${title} Feature 2`),
        },
        {
          title: 'Einfach erweiterbar',
          description: 'Produktbezogene Storytelling-Sektionen lassen sich ueber eine zentrale Content-Definition pro Produkt anpassen.',
          ...image(undefined, 2, `${title} Feature 3`),
        },
      ],
    },
    faq: {
      title: 'FAQs',
      subtitle: 'Wir beantworten Deine Fragen',
      items: [],
      initiallyOpen: [],
    },
  }
}

export function getProductDetailContent(product?: ShopifyProduct | null): ProductDetailContent {
  const preset = resolveProductPagePreset(normalizeValue(product?.handle))

  switch (preset.contentKey) {
    case 't-apex':
      return buildTApexContent(product)
    case 'exopek-pro':
      return buildExopekProContent(product)
    case 'tunturi':
      return buildTunturiContent(product)
    case 'optogait':
      return buildOptogaitContent(product)
    default:
      return buildDefaultContent(product)
  }
}
