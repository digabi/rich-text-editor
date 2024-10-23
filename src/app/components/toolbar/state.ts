import { useState } from 'react'
import { eventHandlerWithoutFocusLoss } from '../../utility'

export default function useToolbarState() {
  const [isExpand, setExpand] = useState(false)

  return {
    isExpand,
    expandOn: eventHandlerWithoutFocusLoss(() => setExpand(true)),
    expandOff: eventHandlerWithoutFocusLoss(() => setExpand(false)),
    expandFlip: eventHandlerWithoutFocusLoss(() => setExpand((v) => !v)),
  }
}
