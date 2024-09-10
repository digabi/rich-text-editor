import { useState } from 'react'

/** Returns a function that requests a rerender when called */
export default function useRerender() {
  const [_, tick] = useState(0)
  return () => tick((counter) => (counter + 1) % (Number.MAX_SAFE_INTEGER - 1))
}
