// Remove trailing and leading slash, usually included in nodes
// returned by the BigCommerce API
const getSlug = (path: string) => path.replace(/^\/|\/$/g, '')

// Replace whitespace with dashes for complete slugs
//   path.replace(/[ ]/g, '-')

export default getSlug
