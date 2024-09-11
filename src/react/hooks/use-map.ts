import { useState } from 'react'

export type MapHookHandle<K, V> = ReturnType<typeof useMap<K, V>>

/**
 * An ES6 `Map` object that's bound to a React state.
 *
 * Mutations on the returned object will cause a rerender.
 */
export default function useMap<K, V>(initial?: Iterable<[K, V]>) {
  // React always decides whether it should rerender by comparing the old vs
  // new state *by reference*. This hook informs React of the Map mutations
  // (e.g. "set" or "delete") by mutating the Map and then setting the state
  // to *a brand new object* which has a reference to the mutated Map.

  const [obj, setObj] = useState({ current: new Map(initial) })

  function mutate(fn: (map: Map<K, V>) => void) {
    setObj((map) => {
      fn(map.current)

      // The Map referenced by `current` is the same but the Object we return
      // is different from the old state, so React will rerender!
      return { current: map.current }
    })
  }

  return {
    /** The underlying Map object. **Mutating this won't cause a rerender!** */
    raw: obj.current,

    has: obj.current.has.bind(obj.current),
    get: obj.current.get.bind(obj.current),
    values: obj.current.values.bind(obj.current),

    set: (key: K, value: V) => mutate((map) => map.set(key, value)),
    delete: (key: K) => mutate((map) => map.delete(key)),
  }
}
