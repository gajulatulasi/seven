import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface GlobeProps {
  selectedRegion: string;
  metrics: {
    temperature: string;
    precipitation: string;
    seaLevel: string;
    extremeEvents: string;
  };
}

const Globe = ({ selectedRegion, metrics }: GlobeProps) => {
  const globeRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Load textures
  const textures = useTexture({
    map: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    bumpMap: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    specularMap: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    cloudsMap: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
  });

  useEffect(() => {
    if (!globeRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Temperature-based color mapping
    const temp = parseFloat(metrics.temperature);
    const getTemperatureColor = (t: number) => {
      if (t > 2) return '#ef4444';
      if (t > 1) return '#f97316';
      return '#22c55e';
    };

    // Region coordinates mapping
    const regions: Record<string, { x: number; y: number; width: number; height: number }> = {
      'North America': { x: 400, y: 100, width: 600, height: 300 },
      'Europe': { x: 900, y: 100, width: 300, height: 200 },
      'Asia': { x: 1200, y: 100, width: 500, height: 400 },
      'Africa': { x: 900, y: 300, width: 300, height: 400 },
      'South America': { x: 600, y: 400, width: 300, height: 400 },
      'Oceania': { x: 1400, y: 500, width: 400, height: 300 }
    };

    if (selectedRegion !== 'Global' && regions[selectedRegion]) {
      const region = regions[selectedRegion];
      const color = getTemperatureColor(temp);

      ctx.fillStyle = color;
      ctx.globalAlpha = 0.8;
      ctx.fillRect(region.x, region.y, region.width, region.height);

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(region.x, region.y, region.width, region.height);
    }

    const climateTexture = new THREE.CanvasTexture(canvas);
    climateTexture.needsUpdate = true;

    const material = globeRef.current.material as THREE.MeshPhongMaterial;
    material.map = textures.map;
    material.bumpMap = textures.bumpMap;
    material.bumpScale = 0.08;
    material.specularMap = textures.specularMap;
    material.specular = new THREE.Color(0x444444);
    material.shininess = 30;
    material.emissiveMap = climateTexture;
    material.emissive = new THREE.Color(0xffffff);
    material.emissiveIntensity = 0.9;
  }, [selectedRegion, metrics, textures]);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.07;
    }
  });

  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial />
      </mesh>
      <mesh ref={cloudsRef} scale={[1.003, 1.003, 1.003]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={textures.cloudsMap}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

const ClimateGlobe = ({ selectedRegion, metrics }: GlobeProps) => {
  return (
    <div className="earth-container">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <directionalLight position={[5, 3, 5]} intensity={1} />
        <Globe selectedRegion={selectedRegion} metrics={metrics} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={8}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default ClimateGlobe;