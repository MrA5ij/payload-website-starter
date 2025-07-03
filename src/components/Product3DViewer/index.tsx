'use client'

import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
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
    <div
      className="flex flex-col items-center justify-center h-full w-full"
      style={{ minHeight: 150 }}
    >
      <svg
        className="animate-spin h-8 w-8 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      <span className="text-xs text-gray-400 mt-2">Loading Model…</span>
    </div>
  )
}

/**
 * Product3DViewer component
 * Usage: <Product3DViewer modelUrl={media.url} />
 */
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
          <OrbitControls enableRotate enableZoom enablePan enableDamping dampingFactor={0.12} />
        </Canvas>
      </ModelErrorBoundary>
    </div>
  )
}

// Export for error fallback usage in other modules if needed
export { ModelErrorBoundary } from './ErrorBoundary'
