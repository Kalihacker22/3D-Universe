export interface CelestialObject {
  id: string;
  name: string;
  type: 'star' | 'planet' | 'moon' | 'asteroid' | 'galaxy';
  position: [number, number, number];
  scale: number;
  texture?: string;
  description?: string;
  parent?: string;
  orbit?: {
    semiMajorAxis: number;
    eccentricity: number;
    inclination: number;
    period: number;
  };
}

export interface StarSystem {
  id: string;
  name: string;
  position: [number, number, number];
  stars: CelestialObject[];
  planets: CelestialObject[];
  asteroids?: CelestialObject[];
}