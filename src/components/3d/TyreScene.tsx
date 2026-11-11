'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'

export interface TyreProps {
  accentColor?: string
  rimColor?: string
  autoRotate?: boolean
  rotationSpeed?: number
  scale?: number
}

function Tyre({
  accentColor = '#f4d000',
  rimColor = '#25282e',
  autoRotate = true,
  rotationSpeed = 0.28,
  scale = 1.28,
}: TyreProps) {
  const ref = useRef<Group>(null)
  useFrame((state, delta) => {
    if (!ref.current) return
    if (autoRotate) {
      ref.current.rotation.y += delta * rotationSpeed
    }
    ref.current.rotation.x += (state.pointer.y * 0.12 - ref.current.rotation.x) * 0.035
    ref.current.rotation.z += (-state.pointer.x * 0.1 - ref.current.rotation.z) * 0.035
  })

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={ref} rotation={[0.08, -0.35, 0.02]} scale={scale}>
        {/* Main Rubber Tyre */}
        <mesh castShadow>
          <torusGeometry args={[1.22, 0.48, 44, 128]} />
          <meshStandardMaterial color="#101114" roughness={0.42} metalness={0.15} />
        </mesh>

        {/* Aggressive 3D Tread Lugs */}
        {Array.from({ length: 32 }).map((_, index) => {
          const angle = (index / 32) * Math.PI * 2
          return (
            <mesh
              key={index}
              position={[Math.cos(angle) * 1.56, Math.sin(angle) * 1.56, 0]}
              rotation={[0, 0, angle]}
              castShadow
            >
              <boxGeometry args={[0.18, 0.44, 0.72]} />
              <meshStandardMaterial color="#08090a" roughness={0.7} />
            </mesh>
          )
        })}

        {/* Outer Accent Rim Stripe */}
        <mesh>
          <torusGeometry args={[0.72, 0.065, 18, 64]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.38}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Central Alloy Wheel Disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.65, 0.65, 0.16, 48]} />
          <meshStandardMaterial color={rimColor} metalness={0.92} roughness={0.18} />
        </mesh>

        {/* Dynamic Sport Spokes */}
        {Array.from({ length: 5 }).map((_, index) => {
          const angle = (index / 5) * Math.PI * 2
          return (
            <mesh
              key={`spoke-${index}`}
              position={[Math.cos(angle) * 0.35, Math.sin(angle) * 0.35, 0.04]}
              rotation={[0, 0, angle + Math.PI / 2]}
            >
              <boxGeometry args={[0.08, 0.45, 0.1]} />
              <meshStandardMaterial color={accentColor} metalness={0.85} roughness={0.25} />
            </mesh>
          )
        })}

        {/* Center Cap with Brand Accent */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.24, 24]} />
          <meshStandardMaterial color={accentColor} metalness={0.7} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  )
}

export interface TyreSceneProps {
  accentColor?: string
  rimColor?: string
  interactiveControls?: boolean
  autoRotate?: boolean
  rotationSpeed?: number
  scale?: number
}

export default function TyreScene({
  accentColor = '#f4d000',
  rimColor = '#25282e',
  interactiveControls = true,
  autoRotate = true,
  rotationSpeed = 0.28,
  scale = 1.28,
}: TyreSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5.8], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <spotLight
        position={[4, 5, 5]}
        angle={0.32}
        penumbra={1}
        intensity={80}
        color="#fff4bf"
        castShadow
      />
      <pointLight position={[-4, -1, 3]} intensity={38} color="#4b68ff" />
      <pointLight position={[3, -2, -2]} intensity={30} color={accentColor} />

      <Tyre
        accentColor={accentColor}
        rimColor={rimColor}
        autoRotate={autoRotate}
        rotationSpeed={rotationSpeed}
        scale={scale}
      />

      {interactiveControls && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={rotationSpeed * 5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(Math.PI * 2) / 3}
        />
      )}

      <ContactShadows position={[0, -2.05, 0]} opacity={0.55} scale={7} blur={2.5} far={4} />
      <Environment preset="city" />
    </Canvas>
  )
}
