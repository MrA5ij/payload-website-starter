'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
// @ts-expect-error: No type declarations for GLTFLoader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import { ModelErrorBoundary } from './ErrorBoundary'

type Props = {
  modelUrl?: string
}

function Model({ url }: { url: string }) {
  const gltf = useLoader(GLTFLoader, url)
  return <primitive object={gltf.scene} dispose={null} />
}

function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <svg
        className="animate-spin h-8 w-8 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span className="text-xs text-gray-400 mt-2">Loading Model…</span>
    </div>
  )
}

export default function Product3DViewer({ modelUrl }: Props) {
  if (!modelUrl)
    return (
      <div
        className="border rounded-xl flex items-center justify-center bg-gray-100"
        style={{ width: 250, height: 250, color: '#888' }}
      >
        No 3D Model
      </div>
    )
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 2px 14px #0001',
      }}
    >
      <ModelErrorBoundary>
        <Canvas camera={{ position: [1.5, 1.5, 2.8], fov: 45 }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[3, 6, 5]} intensity={1.5} castShadow />
          <Suspense fallback={<Spinner />}>
            <Model url={modelUrl} />
            <Environment preset="warehouse" background={false} />
          </Suspense>
          <OrbitControls
            enableRotate
            enableZoom
            enablePan
            mouseButtons={{
              LEFT: 0,
              MIDDLE: 1,
              RIGHT: 2,
            }}
            enableDamping
            dampingFactor={0.12}
            // Touch controls enabled by default
          />
        </Canvas>
      </ModelErrorBoundary>
    </div>
  )
}
export { ModelErrorBoundary } from './ErrorBoundary'
