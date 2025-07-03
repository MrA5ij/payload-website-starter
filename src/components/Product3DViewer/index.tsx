'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'

type Props = {
  modelUrl?: string
}

function Model({ url }: { url: string }) {
  const gltf = useLoader(GLTFLoader, url)
  return <primitive object={gltf.scene} dispose={null} />
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
        width: 250,
        height: 250,
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 2px 14px #0001',
      }}
    >
      <Canvas camera={{ position: [1.5, 1.5, 2.8], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 6, 5]} intensity={1.5} castShadow />
        <Suspense fallback={null}>
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
        />
      </Canvas>
    </div>
  )
}
