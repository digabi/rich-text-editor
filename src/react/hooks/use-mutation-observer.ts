import { RefObject, useEffect } from 'react'

/** Attaches a given `MutationCallback` to mutations in a `ref` */
export default function useMutationObserver<T extends Node>(
  ref: RefObject<T>,
  callback: MutationCallback,
  options = {
    attributes: false,
    characterData: false,
    childList: true,
    subtree: false,
  },
) {
  useEffect(() => {
    if (!ref.current) return

    const observer = new MutationObserver(callback)
    observer.observe(ref.current, options)

    return () => observer.disconnect()
  }, [callback, options])
}
