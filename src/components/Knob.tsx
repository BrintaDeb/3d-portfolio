import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import './styles/Knob.css';

interface KnobProps {
  itemsCount: number;
  currentIndex: number;
  onChange: (index: number) => void;
}

const Knob3DModel = ({ rotationAngle }: { rotationAngle: number }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      // Smoothly interpolate towards the target rotation
      // The DOM rotation is in degrees, ThreeJS uses radians. Rotate around Z axis.
      const targetRotationZ = THREE.MathUtils.degToRad(-rotationAngle);
      meshRef.current.rotation.z += (targetRotationZ - meshRef.current.rotation.z) * 0.15;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Base Cylinder */}
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.2, 2.3, 0.8, 64]} />
        <meshPhysicalMaterial 
          color="#1a1a1a" 
          metalness={0.8} 
          roughness={0.2} 
          clearcoat={0.5} 
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Top Cap Bevel */}
      <mesh position={[0, 0, 0.4]} castShadow receiveShadow>
        <cylinderGeometry args={[2.1, 2.2, 0.1, 64]} rotation={[Math.PI / 2, 0, 0]}/>
        <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Indicator Dot (Accent color) */}
      <mesh position={[0, 1.5, 0.45]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="var(--accentColor)" emissive="var(--accentColor)" emissiveIntensity={0.5} />
      </mesh>

      {/* Grip Notches around the cylinder */}
      {[...Array(24)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.sin((i / 24) * Math.PI * 2) * 2.25, 
            Math.cos((i / 24) * Math.PI * 2) * 2.25, 
            0
          ]}
          rotation={[0, 0, -(i / 24) * Math.PI * 2]}
        >
          <boxGeometry args={[0.15, 0.6, 0.7]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
};


const Knob: React.FC<KnobProps> = ({ itemsCount, currentIndex, onChange }) => {
  const knobRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(currentIndex * (360 / itemsCount));
  const isDragging = useRef(false);
  const lastAngle = useRef(0);
  const currentRotation = useRef(rotation);
  
  useEffect(() => {
    if (!isDragging.current) {
      const targetRotation = currentIndex * (360 / itemsCount);
      let diff = (targetRotation - currentRotation.current) % 360;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      
      const newRotation = currentRotation.current + diff;
      setRotation(newRotation);
      currentRotation.current = newRotation;
    }
  }, [currentIndex, itemsCount]);

  const calculateAngle = (e: React.PointerEvent | PointerEvent) => {
    if (!knobRef.current) return 0;
    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    // adding 90 degrees offset so the top is 0
    return (Math.atan2(y, x) * (180 / Math.PI)) + 90;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastAngle.current = calculateAngle(e);
    
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    
    if (knobRef.current) {
        knobRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging.current) return;
    const angle = calculateAngle(e);
    let delta = angle - lastAngle.current;
    
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    
    const newRotation = currentRotation.current + delta;
    setRotation(newRotation);
    currentRotation.current = newRotation;
    lastAngle.current = angle;
    
    const segment = 360 / itemsCount;
    let normalizedRot = newRotation % 360;
    if (normalizedRot < 0) normalizedRot += 360;
    
    let index = Math.round(normalizedRot / segment) % itemsCount;
    if (index !== currentIndex) {
      onChange(index);
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  };

  return (
    <div className="knob-wrapper">
      <div 
        className="knob-container"
        ref={knobRef}
        onPointerDown={handlePointerDown}
        style={{ touchAction: 'none' }}
      >
        <Canvas 
          className="knob-canvas"
          camera={{ position: [0, 0, 6.5], fov: 50 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
        >
          <ambientLight intensity={2} />
          <spotLight position={[5, 10, 10]} intensity={2.5} penumbra={1} castShadow />
          <directionalLight position={[-5, 5, 5]} intensity={1.5} />
          
          <Knob3DModel rotationAngle={rotation} />
          
          <Environment preset="city" />
        </Canvas>
        
        {/* We keep the SVG ticks for UI scale context behind the canvas */}
        <svg className="knob-ticks" viewBox="0 0 100 100" style={{ zIndex: 0 }}>
          {[...Array(60)].map((_, i) => (
            <line 
              key={i} 
              x1="50" y1="2" x2="50" y2={i % 5 === 0 ? "8" : "5"} 
              transform={`rotate(${i * 6} 50 50)`} 
              stroke={i % 5 === 0 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)"} 
              strokeWidth="0.5" 
            />
          ))}
        </svg>
        <div className="knob-center" style={{ pointerEvents: 'none', zIndex: 2 }}>
            <span>DRAG</span>
        </div>
      </div>
    </div>
  );
};

export default Knob;
