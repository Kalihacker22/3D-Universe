import * as THREE from 'three';
import { COLORS } from '../constants/colors';

export function generateGalaxyParticles(count: number): THREE.Points {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  
  const color = new THREE.Color();
  const centerColor = new THREE.Color(COLORS.space.core);
  const dustColor = new THREE.Color(COLORS.space.dust);

  // Parameters for spiral arms
  const arms = 4;
  const armWidth = 0.3;
  const armLengthFactor = 0.8;
  const spiralFactor = 3;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = Math.pow(Math.random(), 2) * 100;
    const armAngle = ((i % arms) / arms) * Math.PI * 2;
    const spiralAngle = radius * spiralFactor;
    
    // Add spiral arm effect
    const theta = armAngle + spiralAngle;
    const spread = (1 - Math.exp(-radius * 0.02)) * armWidth;
    const deviation = (Math.random() - 0.5) * spread;

    // Calculate position with spiral pattern
    positions[i3] = Math.cos(theta + deviation) * radius;
    positions[i3 + 1] = (Math.random() - 0.5) * radius * 0.1;
    positions[i3 + 2] = Math.sin(theta + deviation) * radius;

    // Add more variation to particle sizes
    const particleSize = Math.random();
    scales[i] = particleSize * (radius < 20 ? 2 : 1);

    // Color gradient from center to edges
    const mixRatio = Math.min(radius / 80, 1);
    if (radius < 15) {
      // Core stars are brighter and more yellow
      color.setHex(0xFDB813).lerp(centerColor, mixRatio * 0.5);
    } else if (radius < 40) {
      // Mid-region stars are mixed
      color.copy(centerColor).lerp(dustColor, mixRatio * 0.7);
    } else {
      // Outer region stars are bluer
      color.copy(dustColor).lerp(new THREE.Color(0x4F7CFF), (mixRatio - 0.5) * 0.5);
    }
    
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  const material = new THREE.PointsMaterial({
    size: 0.2,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}

export function generateNebulae(count: number): THREE.Points {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);

  const nebulaColors = [
    new THREE.Color(0xFF6B6B), // Red
    new THREE.Color(0x4F7CFF), // Blue
    new THREE.Color(0x6BCB77), // Green
    new THREE.Color(0x9B6BFF), // Purple
  ];

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = 30 + Math.random() * 70;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI * 0.5;

    positions[i3] = radius * Math.cos(theta) * Math.cos(phi);
    positions[i3 + 1] = radius * Math.sin(phi);
    positions[i3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

    const colorIndex = Math.floor(Math.random() * nebulaColors.length);
    const nebulaColor = nebulaColors[colorIndex];
    
    colors[i3] = nebulaColor.r;
    colors[i3 + 1] = nebulaColor.g;
    colors[i3 + 2] = nebulaColor.b;

    scales[i] = 2 + Math.random() * 4;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  const material = new THREE.PointsMaterial({
    size: 4,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}