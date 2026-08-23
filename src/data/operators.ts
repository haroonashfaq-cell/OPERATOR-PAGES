import fs from 'fs'
import path from 'path'

export interface FloorPlan {
  name: string
  tier: string
  beds: number
  baths: number
  sqft: number
  price: number
  img: string
  imgAlt: string
  promo?: string
}

export interface Amenity {
  title: string
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface OperatorMeta {
  slug: string
  name: string
  tagline?: string
  description: string
  headquarters: string
  phone?: string
  website: string
  totalProperties: number
  markets: string[]
  founded?: number
}

export interface PropertyData {
  slug: string
  name: string
  subtitle: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  email: string
  heroImage: string
  heroAlt: string
  heroHeadline: string
  heroDescription: string
  promoText?: string | null
  pricingHeadline: string
  pricingDescription: string
  pricingBullets: string[]
  samplePlan: {
    name: string
    details: string
    breakdown: { label: string; value: string }[]
    total: string
    note: string
  }
  floorPlans: FloorPlan[]
  amenitiesHeadline: string
  amenitiesDescription: string
  amenities: Amenity[]
  amenityImage: string
  amenityImageAlt: string
  neighborhoodHeadline: string
  neighborhoodDescription: string
  neighborhoodImage: string
  neighborhoodImageAlt: string
  galleryImages: { src: string; alt: string; caption?: string }[]
  faqs: FAQ[]
  tourHeadline: string
  tourDescription: string
  metaTitle: string
  metaDescription: string
}

// For backward compat
export type OperatorData = PropertyData

const DATA_DIR = path.join(process.cwd(), 'src/data/operators')

export function getAllOperatorSlugs(): string[] {
  try {
    return fs.readdirSync(DATA_DIR).filter((dir) => {
      const fullPath = path.join(DATA_DIR, dir)
      return fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, '_operator.json'))
    })
  } catch {
    return []
  }
}

export function getOperatorMeta(operatorSlug: string): OperatorMeta | undefined {
  try {
    const filePath = path.join(DATA_DIR, operatorSlug, '_operator.json')
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return undefined
  }
}

export function getPropertiesByOperator(operatorSlug: string): PropertyData[] {
  try {
    const dir = path.join(DATA_DIR, operatorSlug)
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json') && f !== '_operator.json')
    return files.map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
      return JSON.parse(raw) as PropertyData
    })
  } catch {
    return []
  }
}

export function getProperty(operatorSlug: string, propertySlug: string): PropertyData | undefined {
  try {
    const filePath = path.join(DATA_DIR, operatorSlug, `${propertySlug}.json`)
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as PropertyData
  } catch {
    return undefined
  }
}

export function getAllOperatorPropertyPairs(): { operator: string; slug: string }[] {
  const operators = getAllOperatorSlugs()
  const pairs: { operator: string; slug: string }[] = []
  for (const op of operators) {
    const properties = getPropertiesByOperator(op)
    for (const prop of properties) {
      pairs.push({ operator: op, slug: prop.slug })
    }
  }
  return pairs
}

// Legacy support — keep old functions working during migration
export function getOperator(slug: string): PropertyData | undefined {
  return getProperty('air-communities', slug)
}

export function getAllOperatorSlugsLegacy(): string[] {
  return getPropertiesByOperator('air-communities').map(p => p.slug)
}
