import { SwellConfig } from '../api'

const getVendors = async (config: SwellConfig) => {
  const vendors: [string] =
    (await config.fetch('attributes', 'get', ['brand']))?.values ?? []

  console.log('Vendors from Fetch')
  console.log(vendors)

  return [...new Set(vendors)].map((v) => ({
    id: v,
    name: v,
    slug: v.replace(/\s+/g, '-').toLowerCase(),
    path: `/${v}`.toLowerCase(),
  }))
}

export default getVendors
