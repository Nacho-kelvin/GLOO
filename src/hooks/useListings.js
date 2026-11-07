import { LISTINGS } from '../data/listings.js'

// Static site listings. Update src/data/listings.js to publish client-owned content.
export function useListings() {
  return { status: 'ready', ...LISTINGS }
}
