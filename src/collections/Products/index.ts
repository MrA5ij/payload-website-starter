import type { CollectionConfig } from 'payload'

const Products: CollectionConfig = {
  slug: 'products',
  // ...your existing config...
  fields: [
    // ...your other fields...
    {
      name: 'model3d',
      label: '3D Model (GLTF/GLB)',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: { description: 'Upload .glb or .gltf only' },
      filterOptions: {
        mimeType: { in: ['model/gltf-binary', 'model/gltf+json'] },
      },
    },
    // ...other fields...
  ],
}

export default Products
export const collections = { Products }
