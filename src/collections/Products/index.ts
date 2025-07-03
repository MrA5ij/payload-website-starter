import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // Other fields as needed
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
  ],
}

// ---- یہ لائن لازمی add کرو ----
export default Products
