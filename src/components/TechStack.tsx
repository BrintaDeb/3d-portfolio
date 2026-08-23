import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import Marquee from "react-fast-marquee";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const techSkills = [
  { name: "React", icon: "/images/react2.webp", category: "Frontend" },
  { name: "Next.js", icon: "/images/next2.webp", category: "Fullstack" },
  { name: "TypeScript", icon: "/images/typescript.webp", category: "Language" },
  { name: "JavaScript", icon: "/images/javascript.webp", category: "Language" },
  { name: "Node.js", icon: "/images/node2.webp", category: "Backend" },
  { name: "Express", icon: "/images/express.webp", category: "Backend" },
  { name: "MongoDB", icon: "/images/mongo.webp", category: "Database" },
  { name: "MySQL", icon: "/images/mysql.webp", category: "Database" },
  { name: "Figma", icon: "/images/figma.webp", category: "UI/UX" },
  { name: "Adobe XD", icon: "/images/xd.webp", category: "UI/UX" },
  { name: "Photoshop", icon: "/images/photoshop.webp", category: "Design" },
  { name: "Illustrator", icon: "/images/illustrator.webp", category: "Vector" },
  { name: "Premiere Pro", icon: "/images/premierepro.webp", category: "Motion" },
  { name: "InDesign", icon: "/images/indesign.webp", category: "Publishing" },
  { name: "Procreate", icon: "/images/procreate.webp", category: "Illustration" },
  { name: "Canva", icon: "/images/canva.webp", category: "Design" },
  { name: "Adobe Fresco", icon: "/images/fresco.webp", category: "Painting" },
];

const textureLoader = new THREE.TextureLoader();
const textures = techSkills.map((s) => textureLoader.load(s.icon));
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    if (api.current) {
      api.current.applyImpulse({
        x: (Math.random() - 0.5) * 100,
        y: Math.random() * 100 + 50,
        z: (Math.random() - 0.5) * 100
      }, true);
      
      api.current.applyTorqueImpulse({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 20
      }, true);
    }
  };

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        onPointerDown={handlePointerDown}
      />
    </RigidBody>
  );
}

function Pointer({
  vec = new THREE.Vector3(),
  isActive,
}: {
  vec?: THREE.Vector3;
  isActive: boolean;
}) {
  const ref = useRef<RapierRigidBody | null>(null);
  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });
  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const el = document.getElementById("work");
      if (el) {
        const threshold = el.getBoundingClientRect().top;
        setIsActive(scrollY > threshold);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          metalness: 0.2,
          roughness: 0.3,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1,
          envMapIntensity: 1.5
        })
    );
  }, []);

  const row1 = techSkills.slice(0, 9);
  const row2 = techSkills.slice(9);

  return (
    <div className="techstack" id="techstack">
      <h2>My Techstack</h2>

      {isDesktop ? (
        <Canvas
          shadows
          gl={{ alpha: true, stencil: false, depth: false, antialias: false, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.0)}
          className="tech-canvas"
        >
          <ambientLight intensity={1} />
          <spotLight
            position={[20, 20, 25]}
            penumbra={1}
            angle={0.2}
            color="white"
            castShadow
            shadow-mapSize={[512, 512]}
          />
          <directionalLight position={[0, 5, -4]} intensity={2} />
          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} />
            {spheres.map((props, i) => (
              <SphereGeo
                key={i}
                {...props}
                material={materials[Math.floor(Math.random() * materials.length)]}
                isActive={isActive}
              />
            ))}
          </Physics>
          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.5}
            environmentRotation={[0, 4, 2]}
          />
          <EffectComposer enableNormalPass={false}>
            <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
            <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.5} />
            <ChromaticAberration 
              blendFunction={BlendFunction.NORMAL} 
              offset={new THREE.Vector2(0.001, 0.001)} 
              radialModulation={false}
              modulationOffset={0}
            />
          </EffectComposer>
        </Canvas>
      ) : (
        <div className="tech-mobile-container">
          <p className="tech-mobile-subtitle">Technologies, frameworks, and design tools I work with daily</p>
          <div className="tech-marquee-wrapper">
            <Marquee speed={35} gradient={false} pauseOnHover={true} className="tech-marquee">
              {row1.map((tech, idx) => (
                <div key={idx} className="tech-mobile-card">
                  <img src={tech.icon} alt={tech.name} className="tech-mobile-icon" loading="lazy" />
                  <span className="tech-mobile-name">{tech.name}</span>
                </div>
              ))}
            </Marquee>
            <Marquee speed={30} direction="right" gradient={false} pauseOnHover={true} className="tech-marquee">
              {row2.map((tech, idx) => (
                <div key={idx} className="tech-mobile-card">
                  <img src={tech.icon} alt={tech.name} className="tech-mobile-icon" loading="lazy" />
                  <span className="tech-mobile-name">{tech.name}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechStack;
