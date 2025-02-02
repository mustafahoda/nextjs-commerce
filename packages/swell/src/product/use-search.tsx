import type { SwellProduct } from '../types'
import type { SearchProductsHook } from '@vercel/commerce/types/product'

import { SWRHook } from '@vercel/commerce/utils/types'
import useSearch, { type UseSearch } from '@vercel/commerce/product/use-search'
import { normalizeProduct } from '../utils'

export default useSearch as UseSearch<typeof handler>

export type SearchProductsInput = {
  search?: string
  categoryId?: string
  brandId?: string
  sort?: string
}

export const handler: SWRHook<SearchProductsHook> = {
  fetchOptions: {
    query: 'products',
    method: 'list',
  },
  async fetcher({ input, options, fetch }) {
    const sortMap = new Map([
      ['latest-desc', ''],
      ['price-asc', 'price_asc'],
      ['price-desc', 'price_desc'],
      ['trending-desc', 'popularity'],
    ])

    const { categoryId, brandId, search, sort = 'latest-desc' } = input
    console.log('input')
    console.log(input)
    const mappedSort = sortMap.get(sort)
    const { results, count: found } = await fetch({
      query: 'products',
      method: 'list',
      variables: {
        category: categoryId,
        brand: brandId,
        search,
        sort: mappedSort,
      },
    })

    console.log({ results, count: found })

    const products = results.map((product: SwellProduct) =>
      normalizeProduct(product)
    )

    return {
      products,
      found,
    }
  },
  useHook:
    ({ useData }) =>
    (input = {}) => {
      return useData({
        input: [
          ['search', input.search],
          ['categoryId', input.categoryId],
          ['brandId', input.brandId],
          ['sort', input.sort],
        ],
        swrOptions: {
          revalidateOnFocus: false,
          ...input.swrOptions,
        },
      })
    },
}
