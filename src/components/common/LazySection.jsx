import { Box, CircularProgress } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

function LazySection({
  children,
  minHeight = '100vh',
  rootMargin = '300px',
  placeholder = null,
}) {
  const containerRef = useRef(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0.01,
      }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <Box ref={containerRef} sx={{ minHeight }}>
      {shouldRender ? (
        children
      ) : (
        placeholder || (
          <Box
            sx={{
              minHeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size={26} sx={{ color: 'primary.main' }} />
          </Box>
        )
      )}
    </Box>
  )
}

export default LazySection