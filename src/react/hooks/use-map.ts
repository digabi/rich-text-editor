import { useState } from 'react'

export type MapHookHandle<K, V> = ReturnType<typeof useMap<K, V>>

export default function useMap<K, V>(initial?: Iterable<[K, V]>) {
  const [obj, setObj] = useState({ current: new Map(initial) })

  function mutate(fn: (map: Map<K, V>) => void) {
    setObj((map) => {
      fn(map.current)
      return { current: map.current }
    })
  }

  return {
    has: obj.current.has.bind(obj.current),
    get: obj.current.get.bind(obj.current),
    set: (key: K, value: V) => mutate((map) => map.set(key, value)),
    delete: (key: K) => mutate((map) => map.delete(key)),
    values: obj.current.values.bind(obj.current),
    raw: obj.current,
  }
}
