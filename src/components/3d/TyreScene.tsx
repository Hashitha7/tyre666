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
  scale = 1.15,
}: TyreProps) {
  const ref = useRef<Group>(null)
  useFrame((state, delta) => {
    if (!ref.current) return
    if (autoRotate) {
      ref.current.rotation.y += delta * rotationSpeed
    }
    ref.current.rotation.x += (state.pointer.y * 0.1 - ref.current.rotation.x) * 0.03
    ref.current.rotation.z += (-state.pointer.x * 0.08 - ref.current.rotation.z) * 0.03
  })

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.25}>
      <group ref={ref} rotation={[0.15, -0.45, 0.02]} scale={scale}>
        {/* Main Sleek Rubber Tyre */}
        <mesh castShadow receiveShadow>
          <torusGeometry args={[1.25, 0.44, 48, 128]} />
          <meshStandardMaterial color="#111215" roughness={0.35} metalness={0.12} />
        </mesh>

        {/* Circumferential Aqua-Grooves */}
        <mesh position={[0, 0, 0.16]}>
          <torusGeometry args={[1.27, 0.03, 16, 128]} />
          <meshStandardMaterial color="#060708" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0, -0.16]}>
          <torusGeometry args={[1.27, 0.03, 16, 128]} />
          <meshStandardMaterial color="#060708" roughness={0.9} />
        </mesh>

        {/* Outer Accent Rim Stripe */}
        <mesh>
          <torusGeometry args={[0.74, 0.045, 24, 96]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.4}
            metalness={0.85}
            roughness={0.15}
          />
        </mesh>

        {/* Central Alloy Wheel Disc */}
        <mesh>
          <cylinderGeometry args={[0.7, 0.7, 0.18, 64]} />
          <meshStandardMaterial color={rimColor} metalness={0.94} roughness={0.15} />
        </mesh>

        {/* Forged Sport Spokes */}
        {Array.from({ length: 6 }).map((_, index) => {
          const angle = (index / 6) * Math.PI * 2
          return (
            <mesh
              key={`spoke-${index}`}
              position={[Math.cos(angle) * 0.38, Math.sin(angle) * 0.38, 0.04]}
              rotation={[0, 0, angle + Math.PI / 2]}
            >
              <boxGeometry args={[0.07, 0.48, 0.08]} />
              <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.2} />
            </mesh>
          )
        })}

        {/* Center Cap with Brand Accent */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.22, 32]} />
          <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.2} />
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
  interactiveControls = false,
  autoRotate = true,
  rotationSpeed = 0.28,
  scale = 1.15,
}: TyreSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5.2], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.45} />
      <spotLight
        position={[4, 5, 5]}
        angle={0.35}
        penumbra={1}
        intensity={90}
        color="#fff8d4"
        castShadow
      />
      <pointLight position={[-4, -1, 3]} intensity={40} color="#4b68ff" />
      <pointLight position={[3, -2, -2]} intensity={35} color={accentColor} />

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
          autoRotateSpeed={rotationSpeed * 4}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(Math.PI * 2) / 3}
        />
      )}

      <ContactShadows position={[0, -2.0, 0]} opacity={0.5} scale={7} blur={2.5} far={4} />
      <Environment preset="city" />
    </Canvas>
  )
}
