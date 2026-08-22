import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Sphere, TorusKnot } from "@react-three/drei";
import { Suspense } from "react";

const Brief3DModel = () => {
  return (
    <div style={{ width: "100%", height: "300px", minHeight: "300px" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <TorusKnot args={[1, 0.3, 128, 32]} position={[-1, 0, 0]}>
              <MeshDistortMaterial
                color="#22d3ee"
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0.1}
                metalness={0.8}
                roughness={0.2}
                distort={0.4}
                speed={2}
              />
            </TorusKnot>
          </Float>

          <Float speed={3} rotationIntensity={2} floatIntensity={3}>
            <Sphere args={[0.5, 32, 32]} position={[1.5, 1, -1]}>
              <meshStandardMaterial color="#c084fc" metalness={0.5} roughness={0.2} />
            </Sphere>
          </Float>
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Brief3DModel;
