import { StarSystem } from '../types/celestial';
import { generateStarSystems } from '../utils/starGenerator';
import { realStars, realNebulae, realBlackHoles } from './realStars';

// Real star systems
const realSystems: StarSystem[] = [
  {
    id: 'sol',
    name: 'Solar System',
    position: [0, 0, 0],
    stars: [{
      id: 'sun',
      name: 'Sun',
      type: 'star',
      position: [0, 0, 0],
      scale: 5,
      color: '#FDB813',
      description: 'Our home star, a G-type main-sequence star with surface temperature 5,778K'
    }],
    planets: [
      {
        id: 'mercury',
        name: 'Mercury',
        type: 'planet',
        position: [10, 0, 0],
        scale: 0.8,
        description: 'The smallest and innermost planet in the Solar System',
        orbit: {
          semiMajorAxis: 10,
          eccentricity: 0.205,
          inclination: 7,
          period: 0.24
        }
      },
      {
        id: 'venus',
        name: 'Venus',
        type: 'planet',
        position: [15, 0, 0],
        scale: 1.5,
        description: 'Often called Earth\'s sister planet due to similar size',
        orbit: {
          semiMajorAxis: 15,
          eccentricity: 0.007,
          inclination: 3.4,
          period: 0.615
        }
      },
      {
        id: 'earth',
        name: 'Earth',
        type: 'planet',
        position: [20, 0, 0],
        scale: 1.6,
        description: 'Our home planet, the only known world to harbor life',
        orbit: {
          semiMajorAxis: 20,
          eccentricity: 0.017,
          inclination: 0,
          period: 1
        }
      },
      {
        id: 'mars',
        name: 'Mars',
        type: 'planet',
        position: [25, 0, 0],
        scale: 1.2,
        description: 'The Red Planet, named after the Roman god of war',
        orbit: {
          semiMajorAxis: 25,
          eccentricity: 0.093,
          inclination: 1.85,
          period: 1.88
        }
      },
      {
        id: 'jupiter',
        name: 'Jupiter',
        type: 'planet',
        position: [35, 0, 0],
        scale: 3.5,
        description: 'The largest planet in our Solar System',
        orbit: {
          semiMajorAxis: 35,
          eccentricity: 0.048,
          inclination: 1.3,
          period: 11.86
        }
      }
    ]
  }
];

// Convert real stars to star systems
const realStarSystems = realStars.map(star => ({
  id: `system-${star.id}`,
  name: `${star.name} System`,
  position: star.position,
  stars: [star],
  planets: generateStarSystems(1)[0].planets // Add random planets to each real star
}));

// Generate additional procedural star systems
const proceduralSystems = generateStarSystems(200);

// Combine all systems
export const starSystems: StarSystem[] = [
  ...realSystems,
  ...realStarSystems,
  ...proceduralSystems
];

// Export celestial objects for direct use
export const celestialObjects = [
  ...realStars,
  ...realNebulae,
  ...realBlackHoles,
  ...proceduralSystems.flatMap(system => [...system.stars, ...system.planets])
];