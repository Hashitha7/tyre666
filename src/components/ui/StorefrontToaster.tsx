'use client'

import { useEffect } from 'react'
import { Check } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useStorefront } from '@/store/storefront'

export default function StorefrontToaster() {
  const notice = useStorefront((state) => state.notice)
  const setNotice = useStorefront((state) => state.setNotice)
  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(null), 2600)
    return () => window.clearTimeout(timer)
  }, [notice, setNotice])
  return (
    <AnimatePresence>
      {notice && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-semibold text-black shadow-2xl"
        >
          <span className="grid size-6 place-items-center rounded-full bg-race">
            <Check size={14} />
          </span>
          {notice}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
