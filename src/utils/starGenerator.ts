import { StarSystem, CelestialObject } from '../types/celestial';
import { COLORS } from '../constants/colors';

const STAR_TYPES = {
  O: { color: COLORS.stars.blue, scale: 6.6, temp: '30,000-60,000K', probability: 0.00001 },
  B: { color: COLORS.stars.blue, scale: 5.5, temp: '10,000-30,000K', probability: 0.001 },
  A: { color: COLORS.stars.white, scale: 4.4, temp: '7,500-10,000K', probability: 0.006 },
  F: { color: COLORS.stars.white, scale: 3.3, temp: '6,000-7,500K', probability: 0.03 },
  G: { color: COLORS.stars.yellow, scale: 2.2, temp: '5,200-6,000K', probability: 0.076 },
  K: { color: COLORS.stars.yellow, scale: 1.8, temp: '3,700-5,200K', probability: 0.121 },
  M: { color: COLORS.stars.red, scale: 1.4, temp: '2,400-3,700K', probability: 0.765 }
};

const SPECIAL_OBJECTS = {
  BLACKHOLE: { scale: 8, color: '#000000', glowColor: '#4A0404' },
  NEUTRON: { scale: 3, color: '#FFFFFF', glowColor: '#00FFFF' },
  NEBULA: { scale: 20, color: '#FF1493', glowColor: '#FF69B4' }
};

function generateRandomStarType() {
  const random = Math.random();
  let cumulativeProbability = 0;
  
  for (const [type, data] of Object.entries(STAR_TYPES)) {
    cumulativeProbability += data.probability;
    if (random <= cumulativeProbability) return type;
  }
  return 'M';
}

function generateSpecialObjects(position: [number, number, number]): CelestialObject[] {
  const objects: CelestialObject[] = [];
  
  if (Math.random() < 0.05) { // 5% chance for a black hole
    objects.push({
      id: `blackhole-${Math.random().toString(36).substr(2, 9)}`,
      name: 'Supermassive Black Hole',
      type: 'star',
      position: [position[0], position[1], position[2]],
      scale: SPECIAL_OBJECTS.BLACKHOLE.scale,
      color: SPECIAL_OBJECTS.BLACKHOLE.color,
      description: 'A region of spacetime where gravity is so strong that nothing can escape from it'
    });
  }

  if (Math.random() < 0.08) { // 8% chance for a neutron star
    objects.push({
      id: `neutron-${Math.random().toString(36).substr(2, 9)}`,
      name: 'Neutron Star',
      type: 'star',
      position: [
        position[0] + (Math.random() - 0.5) * 10,
        position[1] + (Math.random() - 0.5) * 10,
        position[2] + (Math.random() - 0.5) * 10
      ],
      scale: SPECIAL_OBJECTS.NEUTRON.scale,
      color: SPECIAL_OBJECTS.NEUTRON.color,
      description: 'A collapsed core of a massive supergiant star'
    });
  }

  return objects;
}

function generatePlanets(starPosition: [number, number, number], starScale: number): CelestialObject[] {
  const numPlanets = Math.floor(Math.random() * 8) + 1;
  const planets: CelestialObject[] = [];

  for (let i = 0; i < numPlanets; i++) {
    const distance = (i + 1) * (starScale * 2) + Math.random() * starScale;
    const isHabitable = Math.random() < 0.1 && distance > starScale * 3 && distance < starScale * 6;
    
    const planet: CelestialObject = {
      id: `planet-${Math.random().toString(36).substr(2, 9)}`,
      name: `Planet ${String.fromCharCode(65 + i)}`,
      type: 'planet',
      position: [
        starPosition[0] + distance,
        starPosition[1],
        starPosition[2]
      ],
      scale: 0.8 + Math.random() * 1.2,
      description: isHabitable 
        ? 'A potentially habitable planet within the goldilocks zone'
        : `A ${Math.random() > 0.5 ? 'rocky' : 'gaseous'} planet`,
      orbit: {
        semiMajorAxis: distance,
        eccentricity: Math.random() * 0.2,
        inclination: Math.random() * 10,
        period: Math.sqrt(Math.pow(distance, 3)) * 0.1
      }
    };
    planets.push(planet);

    // Add moons to larger planets
    if (planet.scale > 1.5) {
      const numMoons = Math.floor(Math.random() * 4) + 1;
      for (let j = 0; j < numMoons; j++) {
        const moonDistance = planet.scale * (2 + Math.random());
        planets.push({
          id: `moon-${Math.random().toString(36).substr(2, 9)}`,
          name: `${planet.name}-Moon${j + 1}`,
          type: 'moon',
          position: [
            planet.position[0] + moonDistance,
            planet.position[1],
            planet.position[2]
          ],
          scale: 0.2 + Math.random() * 0.4,
          description: 'A natural satellite',
          parent: planet.id,
          orbit: {
            semiMajorAxis: moonDistance,
            eccentricity: Math.random() * 0.1,
            inclination: Math.random() * 20,
            period: Math.sqrt(Math.pow(moonDistance, 3)) * 0.05
          }
        });
      }
    }
  }

  return planets;
}

export function generateStarSystems(count: number): StarSystem[] {
  const systems: StarSystem[] = [];
  const usedPositions = new Set<string>();

  for (let i = 0; i < count; i++) {
    let position: [number, number, number];
    let positionKey: string;

    do {
      const radius = 20 + Math.random() * 180;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      
      position = [
        radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(theta)
      ];
      positionKey = position.map(p => Math.round(p)).join(',');
    } while (usedPositions.has(positionKey));

    usedPositions.add(positionKey);

    const starType = generateRandomStarType();
    const starInfo = STAR_TYPES[starType as keyof typeof STAR_TYPES];
    const specialObjects = generateSpecialObjects(position);

    const star: CelestialObject = {
      id: `star-${Math.random().toString(36).substr(2, 9)}`,
      name: `${starType}-${i + 1}`,
      type: 'star',
      position,
      scale: starInfo.scale * (0.8 + Math.random() * 0.4),
      color: starInfo.color,
      description: `A ${starType}-type star with surface temperature ${starInfo.temp}`
    };

    const system: StarSystem = {
      id: `system-${star.id}`,
      name: `${star.name} System`,
      position,
      stars: [star, ...specialObjects],
      planets: generatePlanets(position, star.scale)
    };

    // Add binary star systems
    if (Math.random() < 0.2) { // 20% chance for binary system
      const companionType = generateRandomStarType();
      const companionInfo = STAR_TYPES[companionType as keyof typeof STAR_TYPES];
      const distance = star.scale * (3 + Math.random() * 2);
      
      system.stars.push({
        id: `star-companion-${Math.random().toString(36).substr(2, 9)}`,
        name: `${companionType}-${i + 1}B`,
        type: 'star',
        position: [
          position[0] + distance,
          position[1],
          position[2]
        ],
        scale: companionInfo.scale * (0.8 + Math.random() * 0.4),
        color: companionInfo.color,
        description: `A ${companionType}-type companion star with surface temperature ${companionInfo.temp}`
      });
    }

    systems.push(system);
  }

  return systems;
}