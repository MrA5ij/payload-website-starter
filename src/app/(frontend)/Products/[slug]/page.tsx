import type { Metadata } from 'next'
import type { Product, Media } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import Product3DViewer from '@/components/Product3DViewer'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import React, { cache } from 'react'

// Type Guard for 3D Media
function isValidGLBMedia(media: unknown): media is Media {
  return (
    !!media &&
    typeof media === 'object' &&
    'url' in media &&
    typeof (media as any).url === 'string' &&
    (media as any).url.match(/\.(glb|gltf)$/i)
  )
}

// Query Product by Slug
const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] as Product | null
})

type Args = {
  params: Promise<{ slug?: string }>
}

// Page Component
export default async function ProductPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/products/' + slug
  const product = await queryProductBySlug({ slug })

  if (!product) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      {/* 3D Viewer (Only if valid model attached) */}
      {isValidGLBMedia(product.model3d) && (
        <div className="flex justify-center mb-8">
          <Product3DViewer modelUrl={product.model3d.url!} />
        </div>
      )}

      <h1 className="text-3xl font-bold">{product.title}</h1>
      {/* باقی product details جیسے چاہیں display کریں */}
      {/* Add more product details here as needed */}
    </article>
  )
}

// (Optional) SEO Metadata
export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const product = await queryProductBySlug({ slug })
  return {
    title: product?.title || 'Product',
    // description: product?.description || '', // Removed because 'description' does not exist on Product
  }
}
