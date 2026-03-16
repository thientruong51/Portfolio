import { motion } from 'framer-motion'
import { Box } from '@mui/material'

const ease = [0.22, 1, 0.36, 1]

function Slash({
  initial,
  animate,
  exit,
  duration,
  delay = 0,
  background,
  opacity = 1,
  blur = 0,
  zIndex = 30,
}) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{ duration, delay, ease }}
      style={{
        position: 'fixed',
        top: '-25%',
        left: '-35%',
        width: '170%',
        height: '150%',
        transform: 'rotate(-12deg)',
        background,
        opacity,
        filter: blur ? `blur(${blur}px)` : 'none',
        pointerEvents: 'none',
        zIndex,
        willChange: 'transform, opacity',
      }}
    />
  )
}

function PageTransition({ children }) {
  return (
    <>
      {/* page content */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.985, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -20, scale: 1.01, filter: 'blur(4px)' }}
        transition={{ duration: 0.75, ease }}
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          willChange: 'transform, opacity, filter',
        }}
      >
        <Box sx={{ minHeight: '100vh' }}>{children}</Box>
      </motion.div>

      {/* glass overlay: chỉ lóe lên rồi biến mất */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.22, 0] }}
        exit={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.9, ease }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 20,
          pointerEvents: 'none',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          background:
            'linear-gradient(135deg, rgba(18,0,0,0.18) 0%, rgba(90,0,0,0.12) 100%)',
        }}
      />

      {/* slash glow */}
      <Slash
        initial={{ x: '-140%', opacity: 0 }}
        animate={{ x: '140%', opacity: [0, 0.22, 0] }}
        exit={{ x: '140%', opacity: 0 }}
        duration={1.15}
        delay={0.02}
        zIndex={24}
        blur={16}
        background="linear-gradient(120deg, rgba(120,0,0,0.08) 0%, rgba(255,70,70,0.55) 50%, rgba(255,255,255,0.08) 100%)"
      />

  

    
    </>
  )
}

export default PageTransition