import { CelestialObject } from '../types/celestial';
import { COLORS } from '../constants/colors';

export const realStars: CelestialObject[] = [
  // Nearby Stars
  {
    id: 'proxima-centauri',
    name: 'Proxima Centauri',
    type: 'star',
    position: [4.2, 0.2, -0.1],
    scale: 0.7,
    color: COLORS.stars.red,
    description: 'The closest star to our Solar System, a red dwarf star'
  },
  {
    id: 'barnards-star',
    name: 'Barnard\'s Star',
    type: 'star',
    position: [5.9, 0.3, 0.1],
    scale: 0.9,
    color: COLORS.stars.red,
    description: 'One of the closest stars to the Solar System, known for its high proper motion'
  },
  {
    id: 'wolf-359',
    name: 'Wolf 359',
    type: 'star',
    position: [7.9, -0.2, 0.3],
    scale: 0.8,
    color: COLORS.stars.red,
    description: 'One of the faintest and lowest-mass stars known'
  },
  {
    id: 'lalande-21185',
    name: 'Lalande 21185',
    type: 'star',
    position: [8.3, 0.4, -0.2],
    scale: 1.2,
    color: COLORS.stars.red,
    description: 'A red dwarf star with possible planetary companions'
  },
  // Bright Stars
  {
    id: 'sirius',
    name: 'Sirius',
    type: 'star',
    position: [8.6, -0.5, 0.4],
    scale: 4.5,
    color: COLORS.stars.white,
    description: 'The brightest star in Earth\'s night sky'
  },
  {
    id: 'vega',
    name: 'Vega',
    type: 'star',
    position: [25.1, 0.8, -0.6],
    scale: 4.2,
    color: COLORS.stars.white,
    description: 'One of the most luminous nearby stars'
  },
  {
    id: 'arcturus',
    name: 'Arcturus',
    type: 'star',
    position: [36.7, 0.9, 0.7],
    scale: 5.5,
    color: COLORS.stars.yellow,
    description: 'The brightest star in the northern celestial hemisphere'
  },
  {
    id: 'capella',
    name: 'Capella',
    type: 'star',
    position: [42.9, -0.7, 0.5],
    scale: 5.2,
    color: COLORS.stars.yellow,
    description: 'The brightest star in the constellation Auriga'
  },
  // Giant Stars
  {
    id: 'betelgeuse',
    name: 'Betelgeuse',
    type: 'star',
    position: [642.5, 1.2, -0.8],
    scale: 8.5,
    color: COLORS.stars.red,
    description: 'A red supergiant star in Orion, nearing the end of its life'
  },
  {
    id: 'antares',
    name: 'Antares',
    type: 'star',
    position: [554.5, -1.1, 0.9],
    scale: 8.2,
    color: COLORS.stars.red,
    description: 'A red supergiant star in Scorpius'
  },
  // Notable Star Clusters
  {
    id: 'pleiades-1',
    name: 'Alcyone (Pleiades)',
    type: 'star',
    position: [443.8, 0.6, -0.4],
    scale: 3.8,
    color: COLORS.stars.blue,
    description: 'The brightest star in the Pleiades cluster'
  },
  {
    id: 'hyades-1',
    name: 'Aldebaran (Hyades)',
    type: 'star',
    position: [65.3, 0.4, 0.3],
    scale: 5.8,
    color: COLORS.stars.yellow,
    description: 'The brightest star near the Hyades cluster'
  }
];

export const realNebulae = [
  {
    id: 'orion-nebula',
    name: 'Orion Nebula',
    type: 'nebula',
    position: [1344, 2.1, -1.5],
    scale: 12.0,
    color: '#FF6B6B',
    description: 'One of the brightest nebulae visible to the naked eye'
  },
  {
    id: 'crab-nebula',
    name: 'Crab Nebula',
    type: 'nebula',
    position: [6523, -1.8, 1.2],
    scale: 10.0,
    color: '#4F7CFF',
    description: 'Supernova remnant in the constellation Taurus'
  },
  {
    id: 'eagle-nebula',
    name: 'Eagle Nebula',
    type: 'nebula',
    position: [7000, 1.5, -0.9],
    scale: 15.0,
    color: '#6BCB77',
    description: 'Star-forming region containing the "Pillars of Creation"'
  },
  {
    id: 'helix-nebula',
    name: 'Helix Nebula',
    type: 'nebula',
    position: [650, -0.8, 0.6],
    scale: 8.0,
    color: '#9B6BFF',
    description: 'A planetary nebula formed by a dying star'
  }
];

export const realBlackHoles = [
  {
    id: 'sagittarius-a',
    name: 'Sagittarius A*',
    type: 'blackhole',
    position: [26000, 0, 0],
    scale: 15.0,
    color: '#000000',
    description: 'Supermassive black hole at the center of the Milky Way'
  },
  {
    id: 'cygnus-x1',
    name: 'Cygnus X-1',
    type: 'blackhole',
    position: [6070, 0.5, -0.3],
    scale: 7.0,
    color: '#000000',
    description: 'First black hole candidate ever discovered'
  }
];