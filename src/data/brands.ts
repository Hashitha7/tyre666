export interface BrandInfo {
  id: string
  name: string
  slug: string
  tagline: string
  origin: string
  category: string
  terrain: string
  description: string
  accentColor: string
  rimColor: string
  warranty: string
  speedRange: string
  popularSizes: string[]
  keyFeatures: string[]
}

export const brandDetails: Record<string, BrandInfo> = {
  Apex: {
    id: 'brand-apex',
    name: 'Apex',
    slug: 'Apex',
    tagline: 'Motorsport & Circuit Performance',
    origin: 'Melbourne, VIC',
    category: 'Performance',
    terrain: 'Road & Track',
    description:
      'Engineered for maximum lateral G-force, high-speed stability, and razor-sharp steering response under extreme track and road conditions.',
    accentColor: '#f4d000',
    rimColor: '#1c1e24',
    warranty: '5-Year Manufacturer Warranty',
    speedRange: 'Y (300 km/h)',
    popularSizes: ['265/35 R19', '245/40 R19', '275/30 R20'],
    keyFeatures: ['Motorsport Silica Compound', 'Reinforced Outer Shoulder', 'Aqua-Groove Hydro Resistance'],
  },
  Grit: {
    id: 'brand-grit',
    name: 'Grit',
    slug: 'Grit',
    tagline: 'Extreme Mud & Outback 4WD',
    origin: 'Perth, WA',
    category: 'SUV & 4WD',
    terrain: 'Mud-Terrain & Rock',
    description:
      'Heavy-duty puncture-resistant casings and self-cleaning block lugs engineered to dominate Australia’s most brutal off-road trails.',
    accentColor: '#ef4444',
    rimColor: '#0f1115',
    warranty: 'Off-Road Toughness Guarantee',
    speedRange: 'Q (160 km/h)',
    popularSizes: ['285/70 R17', '265/75 R16', '305/70 R17'],
    keyFeatures: ['3-Ply Armor Sidewalls', 'Deep Stone Ejectors', 'Scalloped Shoulder Lugs'],
  },
  Haul: {
    id: 'brand-haul',
    name: 'Haul',
    slug: 'Haul',
    tagline: 'Commercial Cargo & Fleet Radial',
    origin: 'Newcastle, NSW',
    category: 'Light Truck',
    terrain: 'Highway & Worksite',
    description:
      'High-capacity radial construction built for trade utilities, delivery vans, and commercial transporters with high mileage endurance.',
    accentColor: '#f59e0b',
    rimColor: '#2b2d35',
    warranty: 'Heavy Load Mileage Warranty',
    speedRange: 'R (170 km/h)',
    popularSizes: ['245/70 R16', '225/75 R16C', '205/70 R15C'],
    keyFeatures: ['Steel-Belted Reinforcement', 'Heavy Load Rating (118)', 'Even Wear Tread Ribs'],
  },
  Metro: {
    id: 'brand-metro',
    name: 'Metro',
    slug: 'Metro',
    tagline: 'Urban Efficiency & Eco-Cruising',
    origin: 'Brisbane, QLD',
    category: 'Passenger',
    terrain: 'City & Metro Highway',
    description:
      'Low rolling resistance technology engineered for daily city commutes, silent cabin comfort, and superior wet road safety.',
    accentColor: '#10b981',
    rimColor: '#333742',
    warranty: '50,000 km Urban Life Warranty',
    speedRange: 'V (240 km/h)',
    popularSizes: ['205/55 R16', '195/65 R15', '215/60 R16'],
    keyFeatures: ['Fuel-Saving Nano Silica', 'Acoustic Tread Resonance Damping', 'Rapid Water Evacuation'],
  },
  Nocturne: {
    id: 'brand-nocturne',
    name: 'Nocturne',
    slug: 'Nocturne',
    tagline: 'Luxury Zero-Pressure Run-Flat',
    origin: 'Melbourne, VIC',
    category: 'Run-Flat',
    terrain: 'Highway & Express Touring',
    description:
      'Self-supporting sidewall technology ensuring safe vehicle control and continuous mobility up to 80 km after complete puncture or pressure loss.',
    accentColor: '#a855f7',
    rimColor: '#181920',
    warranty: 'Run-Flat Protection Assist',
    speedRange: 'Y (300 km/h)',
    popularSizes: ['245/40 R19', '255/35 R19', '225/45 R18'],
    keyFeatures: ['Extended Mobility Sidewall', 'Heat-Resistant Rubber Core', 'Reinforced Bead Structure'],
  },
  Outland: {
    id: 'brand-outland',
    name: 'Outland',
    slug: 'Outland',
    tagline: 'All-Terrain Expedition & Touring',
    origin: 'Queensland, QLD',
    category: 'SUV & 4WD',
    terrain: 'All-Terrain & Gravel',
    description:
      'Balanced dual-purpose tread geometry offering civilized on-road acoustic comfort paired with fierce gravel, sand, and outback traction.',
    accentColor: '#f97316',
    rimColor: '#1e2129',
    warranty: '80,000 km Mileage Warranty',
    speedRange: 'T (190 km/h)',
    popularSizes: ['265/65 R17', '265/60 R18', '285/65 R18'],
    keyFeatures: ['Aggressive Sidewall Biting Edges', 'Chip & Cut Resistant Rubber', 'M+S & 3PMSF Certified'],
  },
  Summit: {
    id: 'brand-summit',
    name: 'Summit',
    slug: 'Summit',
    tagline: 'All-Weather Highway SUV Touring',
    origin: 'Adelaide, SA',
    category: 'SUV & 4WD',
    terrain: 'Highway & Sealed Roads',
    description:
      'High-grade SUV and crossover touring tyre engineered for stable straight-line tracking, minimal road hum, and luxurious ride suppleness.',
    accentColor: '#38bdf8',
    rimColor: '#2d313c',
    warranty: '70,000 km Touring Warranty',
    speedRange: 'V (240 km/h)',
    popularSizes: ['235/60 R18', '225/65 R17', '235/55 R19'],
    keyFeatures: ['Multi-Pitch Tread Siping', 'High-Density Silica Compound', 'Continuous Center Rib'],
  },
  Velocity: {
    id: 'brand-velocity',
    name: 'Velocity',
    slug: 'Velocity',
    tagline: 'High-Speed Precision Sport Touring',
    origin: 'Sydney, NSW',
    category: 'Passenger',
    terrain: 'Road & Fast Touring',
    description:
      'Dynamic asymmetric passenger tyre designed for spirited sports sedans and modern hatches demanding instant throttle and steering feedback.',
    accentColor: '#00e5ff',
    rimColor: '#22252e',
    warranty: '60,000 km Road Life Warranty',
    speedRange: 'W (270 km/h)',
    popularSizes: ['225/45 R18', '235/40 R18', '245/40 R18'],
    keyFeatures: ['Asymmetric Grip Zones', 'High-Stiffness Shoulder Blocks', 'Wet Grip Rating: A'],
  },
}

export function getBrandData(brandName: string): BrandInfo {
  return (
    brandDetails[brandName] || {
      id: `brand-${brandName.toLowerCase()}`,
      name: brandName,
      slug: brandName,
      tagline: 'Precision Engineered Tyres',
      origin: 'Australia',
      category: 'General',
      terrain: 'Road & Highway',
      description: 'Engineered for Australian vehicle specifications, dependable performance, and safety.',
      accentColor: '#f4d000',
      rimColor: '#25282e',
      warranty: 'Standard Manufacturer Warranty',
      speedRange: 'V (240 km/h)',
      popularSizes: ['Universal Fitment'],
      keyFeatures: ['Durable Compound', 'All-Weather Traction'],
    }
  )
}
